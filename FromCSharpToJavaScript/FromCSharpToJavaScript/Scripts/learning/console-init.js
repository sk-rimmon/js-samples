(function (window, $, sample) {
    'use strict';

    $('#console').console();

    sample.log = function () {
        var console = $('#console').console();
        if (!console) {
            return;
        }

        console.log.apply(console, arguments);
    }
})(window, window.jQuery, window.sample = window.sample || {});