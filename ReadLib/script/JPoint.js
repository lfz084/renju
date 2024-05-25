(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);
    class JPoint {
        constructor(x, y) {
            if (typeof x == "object" && x.constructor.name == "JPoint") {
                this.x = x.x;
                this.y = x.y;
            }
            else {
                this.x = parseInt(x);
                this.y = parseInt(y);
            }
        }
    }

    exports.JPoint = JPoint;
})))
