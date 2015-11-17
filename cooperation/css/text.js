var goToWhere = function (where)
    {
        var me = this;
        clearInterval (me.interval);
        me.site = [];
        var dom = !/.*chrome.*/i.test (navigator.userAgent) ? document.documentElement : document.body;
        var height = !!where ? dom.scrollHeight : 0;
        me.interval = setInterval (function ()
        {
            var speed = (height - dom.scrollTop) / 16;
            if (speed == me.site[0])
            {
                clearInterval (me.interval);
                return null;
            }
            dom.scrollTop += speed;
            me.site.unshift (speed);
        }, 16);
    };