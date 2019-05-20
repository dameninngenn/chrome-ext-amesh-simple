utils = {
    IMAGE_BASE_URL: 'https://tokyo-ame.jwa.or.jp/mesh/000/',
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
    }
}

