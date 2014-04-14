(function (window, $) {
    'use strict';

    // Helper console for displaying output to given HTML element and also to the console in developer tools.
    // Written as a jQuery plugin:
    // - you can attach console output to the every element like <pre> or <textarea>
    // - you can easily access console.
    // - you can select all console elements via custom jQuery selector.

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

    // usage:
    // getter: if element doesn't have console object, creates it at store it to the element's data
    // setter: if element already has console object, return it.
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

    // custom jQuery selector to easily get all console elements from current DOM.
    $.expr[':'].console = function (obj) {
        // return $(obj).data('output-console'); will be slower than selecting through class.
        return $(obj).hasClass('output-console');
    };
})(window, window.jQuery);