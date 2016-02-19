function Ticker() {
    this.interval = 1000;
}

Ticker.prototype.then = function(funk, interval) {
    this.intervalFunk = funk;
    this.max = count;
}


Ticker.prototype.intervalFor = function(funk, count) {
    this.intervalFunk = funk;
    this.max = count;
}

Ticker.prototype.run = function(endFunc, immediateFlag) {
    var that = this;

    var time = 1;

    if(that.max == 0){
        console.log('No interval count.');
        return;
    } else if(that.max == 1){
        that.intervalFunk.call(that, time);

        endFunc.call(this);
    }else if(that.max >= 2){
        if(immediateFlag != null && immediateFlag){
            that.intervalFunk.call(that, time);
            time++;
        }

        var process = setInterval(function(){
            that.intervalFunk.call(that, time);

            time++;
            if(time > that.max){
                clearInterval(process);
                if(endFunc != null){
                    endFunc.call(that);
                }

                return;
            }
        }, that.interval);
    }
}

