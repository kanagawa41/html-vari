function Ticker() {
    this.interval = 1000;
    this.process = null;
}

Ticker.prototype.intervalFor = function(funk, count) {
    this.intervalFunk = funk;
    this.max = count;
}

Ticker.prototype.exit = function() {
    if(this.process != null){
        clearInterval(this.process);
    }
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

        that.process = setInterval(function(){
            that.intervalFunk.call(that, time);

            time++;
            if(time > that.max){
                clearInterval(that.process);
                if(endFunc != null){
                    endFunc.call(that);
                }

                return;
            }
        }, that.interval);
    }
}

