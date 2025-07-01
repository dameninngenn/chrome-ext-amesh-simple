document.addEventListener("DOMContentLoaded", () => {
  const rainImg = document.getElementById("rain");
  const imagePath = getRainImagePath();
  rainImg.setAttribute('src', imagePath);
});

function normalize(num) {
  return (num < 10 ? "0" : "") + num;
}

function getRainImagePath() {
  const IMAGE_BASE_URL = 'https://tokyo-ame.jwa.or.jp/mesh/000/';
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
