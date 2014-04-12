(function (window, $) {
    'use strict';

    var oldConsole = window.console,
        oldDebug = oldConsole ? (oldConsole.debug || $.noop) : $.noop; // IE doesn't have console.debug.

    var OutputConsole = function () {
        this.line = 1;
    };

    $.extend(OutputConsole.prototype, {
        element: null,

        init: function (target) {
            var $this = $(target);
            this.element = $this[0];
            $this.addClass('output-console'); // for speed up :console selector
        },

        log: function () {
            oldDebug.apply(oldConsole, arguments);

            var output = this.line++ + '. ';
            for (var i = 0, len = arguments.length; i < len; i++) {
                var argument = arguments[i],
                    stringVersion = argument;
                if (argument === '') {
                    stringVersion = "''";
                } else if (argument instanceof Array) {
                    stringVersion = '[' + argument + ']';
                }

                output += stringVersion + ' ';
            }

            this.element.innerHTML += output + '\r\n';
        }
    });

    $.fn.console = function () {
        // getter mode
        var current = $(this).data('output-console');
        if (current) {
            return current;
        }

        // setter mode
        return $.each(this, function () {
            var $element = $(this);

            var console = new OutputConsole();
            console.init($element);
            $element.data('output-console', console);
            return console;
        });
    };

    $.expr[':'].console = function (obj) {
        // return $(obj).data('output-console'); will be slower than selecting through class.
        return $(obj).hasClass('output-console');
    };
})(window, window.jQuery);