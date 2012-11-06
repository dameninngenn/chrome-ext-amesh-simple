drawBlackrain();

function mapBlack() {
    var map = {
        "r:0g:0b:0"       : 0,
        "r:204g:255b:255" : 60,
        "r:102g:153b:255" : 50,
        "r:51g:51b:255"   : 40,
        "r:0g:255b:0"     : 30,
        "r:255g:255b:0"   : 20,
        "r:15g:255b:240"  : 10,
        "r:255g:0b:0"     : 0,
    };
    return map;
}

function getIndex(r,g,b) {
    return 'r:' + r + 'g:' + g + 'b:' + b; // ex) r:255g:255:b255
}

// gray is black!!
function convertBlack(r,g,b) {
    var map = mapBlack();
    var index = getIndex(r,g,b);
    return map[index] ? map[index] : 0;
}

function drawBlackrain() {
    var c = utils.constants();
    var canvas = document.getElementById("rain");
    var context = canvas.getContext("2d");
    var imgObj = new Image();
    imgObj.src = utils.getRainImagePath();
    imgObj.onload = function() {
        context.drawImage(imgObj, 0, 0, c.CANVAS_W, c.CANVAS_H);
        var imageData = context.getImageData(0, 0, c.CANVAS_W, c.CANVAS_H);
        for(var y = 0; y < imageData.height; y++) {
             for(var x = 0; x < imageData.width; x++) {
                  var i = (y * 4) * imageData.width + x * 4;
                  var converted_rgb = convertBlack(imageData.data[i],imageData.data[i+1],imageData.data[i+2]);
                  imageData.data[i] = converted_rgb;
                  imageData.data[i+1] = converted_rgb;
                  imageData.data[i+2] = converted_rgb;
             }
        }
        context.putImageData(imageData, 0, 0, 0, 0, c.CANVAS_W, c.CANVAS_H);
    }
}
