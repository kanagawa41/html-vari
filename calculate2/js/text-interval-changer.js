function TextIntervalChanger(parentElement) {
    this.parentElement = parentElement != null ? parentElement : 'body';
    this.defaultInterval_ = 1000;
}

TextIntervalChanger.prototype.setEndThen = function(func) {
    this.endAfterFunciton = func;
}

TextIntervalChanger.prototype.setEventBeforeThen = function(func) {
    this.beforeEventFunciton = func;
}

TextIntervalChanger.prototype.setEventAfterThen = function(func) {
    this.afterEventFunciton = func;
}

TextIntervalChanger.prototype.start = function(targets, interval) {
    if (targets == null || targets.length == 0) {
        console.log('Target is empty');
        return;
    }

    interval = interval != null ? interval : this.defaultInterval_
    this.routine_(targets, interval);
}

TextIntervalChanger.prototype.routine_ = function(targets, interval) {
    var parentElement = this.parentElement;
    var beforeEventFunciton = this.beforeEventFunciton;
    var afterEventFunciton = this.afterEventFunciton;
    var endAfterFunciton = this.endAfterFunciton;

    var max = targets.length;
    var count = 0;

    var process = setInterval(tickEvent_, interval);

    function tickEvent_() {
        if (count >= max) {
            clearInterval(process);

            if(endAfterFunciton != null){
                endAfterFunciton.call(this);
            }
            return;
        }

        if(beforeEventFunciton != null){
            beforeEventFunciton.call(this, count);
        }

        var targetElementDatas = targets[count];

        for (var targetElement in targetElementDatas) {
            $(parentElement).find(targetElement).text(targetElementDatas[targetElement]);
        }

        if(afterEventFunciton != null){
            afterEventFunciton.call(this, count);
        }

        count++;
    }
}
