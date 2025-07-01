const ICONS = {
  default: 'icons/amesh48.png',
  low: 'icons/amesh48_low.png',
  middle: 'icons/amesh48_middle.png',
  high: 'icons/amesh48_high.png',
};

const THRESHOLDS = {
  low: 75,
  middle: 1250,
  high: 3750,
};

const IMAGE_BASE_URL = 'https://tokyo-ame.jwa.or.jp/mesh/000/';

function normalize(num) {
  return (num < 10 ? '0' : '') + num;
}

function getImageUrl() {
  const now = new Date();
  if (now.getMinutes() % 5 === 0) {
    now.setTime(now.getTime() - 60 * 1000);
  }
  const year = normalize(now.getFullYear());
  const month = normalize(now.getMonth() + 1);
  const day = normalize(now.getDate());
  const hour = normalize(now.getHours());
  const minute = normalize(Math.floor(now.getMinutes() / 5) * 5);
  return `${IMAGE_BASE_URL}${year}${month}${day}${hour}${minute}.gif`;
}

async function fetchImageBitmap(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return await createImageBitmap(blob);
}

function countPixels(imageData) {
  let count = 0;
  const data = imageData.data;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] !== 0) count++;
  }
  return count;
}

function selectIcon(count) {
  if (count > THRESHOLDS.high) return ICONS.high;
  if (count > THRESHOLDS.middle) return ICONS.middle;
  if (count > THRESHOLDS.low) return ICONS.low;
  return ICONS.default;
}

async function updateIcon() {
  try {
    const url = getImageUrl();
    const bitmap = await fetchImageBitmap(url);

    const canvas = new OffscreenCanvas(320, 199);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(bitmap, 0, 0, 320, 199);

    const imageData = ctx.getImageData(150, 50, 100, 100);
    const pixelCount = countPixels(imageData);

    const iconPath = selectIcon(pixelCount);

    await chrome.action.setIcon({ path: iconPath });
  } catch (e) {
    console.error('Icon update failed:', e);
  }
}

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'updateRainIcon') {
    updateIcon();
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('updateRainIcon', { periodInMinutes: 5 });
  updateIcon();
});

