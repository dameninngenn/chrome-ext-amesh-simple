rainWatcher();

function rainWatcher() {
    var c = utils.constants();
    var canvas = document.getElementById("rain");
    var context = canvas.getContext("2d");
    var imgObj = new Image();
    imgObj.src = utils.getRainImagePath();
    imgObj.onload = function() {
        context.drawImage(imgObj, 0, 0, c.CANVAS_W, c.CANVAS_H);
        var imageData = context.getImageData(c.WATCH_START_W, c.WATCH_START_H, c.WATCH_RANGE_W, c.WATCH_RANGE_H);
        var count = countColor(imageData.data);
        var icon_path = getIcon(count);
        chrome.browserAction.setIcon({
            path: icon_path
        });
        context.clearRect(0, 0, c.CANVAS_W, c.CANVAS_H);
    }
    setTimeout(function(){
        rainWatcher()
    }, c.TIMEOUT_MSEC);
}

function countColor(pixelArray) {
    var count = 0;
    for( var i = 0; i < pixelArray.length; i++ ) {
        if( pixelArray[i] !== 0 ) {
            count++;
        }
    }
    return count;
}

function getIcon(count) {
    var c = utils.constants();
    var icon_path = c.ICON_DEFAULT;
    if( count > c.THRESHOLD_LOW && count <= c.THRESHOLD_MIDDLE ) {
        icon_path = c.ICON_LOW;
    }
    else if( count > c.THRESHOLD_MIDDLE && count <= c.THRESHOLD_HIGH ) {
        icon_path = c.ICON_MIDDLE;
    }
    else if( count > c.THRESHOLD_HIGH ) {
        icon_path = c.ICON_HIGH;
    }
    return icon_path;
}

