
(function(global, factory) {
    (global = global || self, factory(global));
}(this, (function(exports) {
    'use strict';
    //console.log(exports);
    class IntervalPost {
        constructor(timeout = 500) {
            this.startTime = new Date().getTime();
            this.timeout = timeout;
        }
    }

    IntervalPost.prototype.post = function(cmd, param) {
        if (new Date().getTime() - this.startTime > this.timeout) {
            this.startTime = new Date().getTime();
            post(cmd, param)
        }
    }

    IntervalPost.prototype.setTimeout = function(timerout = 500) {
        this.timeout = timeout;
    }
    
    exports.IntervalPost = IntervalPost;
})))
