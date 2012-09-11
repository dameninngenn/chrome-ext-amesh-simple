var obj = getNormalizedDateObj();
var image_path = 'http://tokyo-ame.jwa.or.jp/mesh/000/' + obj.year + obj.month + obj.day + obj.hour + obj.minute + '.gif';

var rain_img = document.getElementById("rain");
rain_img.setAttribute('src',image_path);

function normalize(num) {
    return ( parseInt(num) < 10 ) ? "0" + num : num;
}

function getNormalizedDateObj() {
    var now = new Date();
    var obj = {
        year   : normalize( now.getFullYear() ),
        month  : normalize( now.getMonth() + 1 ),
        day    : normalize( now.getDate() ),
        hour   : normalize( now.getHours() ),
        minute : normalize( parseInt( now.getMinutes()/5 ) * 5 )
    };
    return obj;
}
