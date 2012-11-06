utils = {
    IMAGE_BASE_URL: 'http://tokyo-ame.jwa.or.jp/mesh/000/',
    normalize: function (num) {
        return ( parseInt(num) < 10 ) ? "0" + num : num;
    },
    getNormalizedDateObj: function () {
        var self = this;
        var d = new Date();
        if( d.getMinutes()%5 === 0 ) {
            d.setTime(d.getTime() - 60 * 1000);
        }
        var obj = {
            year   : self.normalize( d.getFullYear() ),
            month  : self.normalize( d.getMonth() + 1 ),
            day    : self.normalize( d.getDate() ),
            hour   : self.normalize( d.getHours() ),
            minute : self.normalize( parseInt( d.getMinutes()/5 ) * 5 )
        };
        return obj;
    },
    getRainImagePath: function () {
        var self = this;
        var obj = self.getNormalizedDateObj();
        var image_path = self.IMAGE_BASE_URL + obj.year + obj.month + obj.day + obj.hour + obj.minute + '.gif';
        return image_path;
    },
    constants: function () {
        var constants = {
            CANVAS_W         : 320,
            CANVAS_H         : 199,
            WATCH_START_W    : 150,
            WATCH_START_H    : 50,
            WATCH_RANGE_W    : 100,
            WATCH_RANGE_H    : 100,
            ICON_DEFAULT     : 'amesh48.png',
            ICON_LOW         : 'amesh48_low.png',
            ICON_MIDDLE      : 'amesh48_middle.png',
            ICON_HIGH        : 'amesh48_high.png',
            THRESHOLD_LOW    : 300,
            THRESHOLD_MIDDLE : 5000,
            THRESHOLD_HIGH   : 15000,
            TIMEOUT_MSEC     : 300000
        };
        return constants;
    }

}

