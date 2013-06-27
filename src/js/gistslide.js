(function() {

    var win = window;
    var doc = win.document;
    var slice = [].slice;

    function createNode(tagName, param) {
        var node = doc.createElement(tagName);
        var key;
        for(key in param) {
            node.setAttribute(key, param[key]);
        }
        return node;
    }

    var headerPosition = [];
    var currentSlideIndex = 0;

    function keydownEventHandler(e) {
        if(e.which == 37) {
            if(0 < currentSlideIndex) {
                currentSlideIndex--;
            } else {
                currentSlideIndex = 0;
            }
            slideTo(currentSlideIndex);
        } else if(e.which == 39) {
            if(currentSlideIndex < headerPosition.length) {
                currentSlideIndex++;
            } else {
                currentSlideIndex = headerPosition.length;
            }
            slideTo(currentSlideIndex);
        }
    }

    function slideTo(index) {
        if(index < 0 || headerPosition.length < index) {
            window.scrollTo(0, 0);
        } else {
            window.scrollTo(0, headerPosition[index]);
        }
    }

    function initializeGist() {
        //hide left panel
        doc.querySelector(".root-pane").style.display = "none";

        //fix main content
        var column = doc.querySelector(".column");
        column.style.float = "none";
        column.style.width = "100%";

        //hide other content
        doc.querySelector(".js-comment-form").style.display = "none";
        doc.getElementById("header").style.display = "none";
        doc.querySelector(".pagehead").style.display = "none";
        doc.getElementById("footer").style.display = "none";
    }

    (function() {
        //if here is not gist@github
        if(win.location.hostname != "gist.github.com") {
            return;
        }

        //create link node
        var css = createNode('link', {
            rel: 'stylesheet',
            href: 'https://raw.github.com/1000ch/gistdeck/master/src/css/gistslide.css'
        });

        //insert nodes into head tail
        //doc.querySelector('head').appendChild(css);

        initializeGist();

        //cache header positions
        var header1 = slice.call(doc.getElementsByTagName('h1'));
        var header2 = slice.call(doc.getElementsByTagName('h2'));
        var headerArray = header1.concat(header2);
        for(var i = 0, len = headerArray.length;i < len;i++) {
            headerPosition.push(headerArray[i].offsetTop);
        }
        headerPosition.sort();

        //listen keydown event
        doc.addEventListener('keydown', keydownEventHandler);
    })();

})();
