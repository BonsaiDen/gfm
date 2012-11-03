/*global $, marked, prettyPrint */
$(document).ready(function() {

    var input = $('#input'),
        output = $('#output'),
        oldText = '';

    function update() {

        var text = input.val();
        if (text === oldText) {
            return;

        } else {
            oldText = text;
        }

        var tokens = marked.lexer(text);
        output.html(marked.parser(tokens));
        prettyPrint();

    }

    var padding = 30,
        top = document.body.scrollTop;

    // Prevent overscrolling in the textarea from messing around with the body
    // scroll value (and thus scrolling the markdown preview)
    input.bind('mousewheel', function(e) {

        var maxScroll = (input[0].scrollHeight - input.height()) - padding * 2,
            scrollTop = input[0].scrollTop;

        var dir = e.wheelDelta < 0 ? 1 : -1;
        if ((scrollTop <= 0 && dir === -1) || (scrollTop >= maxScroll && dir === 1)) {
            e.preventDefault();
            return false;
        }

    });

    $(document.body).bind('mousewheel', function(e) {
        top = document.body.scrollTop;
    });

    setInterval(update, 100);

});

