'use strict';

const
    countdown = function* {
        while (count > 2) {
            yield count;
            count -= 1;
        }
    },

    counter = countdown(5),

    callback = function() {
        let item = counter.next();
        if (!item.done) {
            console.log(item.value);
            setTimeout(callback, 1000);
        }
    };

callback();

