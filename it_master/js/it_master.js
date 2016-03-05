function commonInit() {
	jQuery.fn.center = function () {
		this.css("position", "absolute");
		this.css("top", ($(window).height() - this.height()) / 2
			+ $(window).scrollTop() + "px");
		this.css("left", ($(window).width() - this.width()) / 2
			+ $(window).scrollLeft() + "px");
		return this;
	};
	$(".body-content").center();

  itMasterInit();
	bootstrapInit();
}

function bootstrapInit(){
  $("[name='study_mode']").bootstrapSwitch();
	$("[name='visual_mode']").bootstrapSwitch();
}

function itMasterInit(){
  var fields = $('#fields');
  $.each(tagData, function (value, name) {
    $option = $('<option>').val(value).text(value);
    fields.append($option);
  });

  $('#navi-word').text('Let\'s calculate!');
}

function switchVisual(flag) {
	if (flag) {
    type = 'start';
    $('#control-btn').removeClass('disable-background-color');
    $('#control-btn').removeClass('glyphicon-pause');
  	$('#control-btn').addClass('glyphicon-play');
  	$('#control-btn').text('Start');

		$('#basic-btn').removeClass('disable-background-color disable-font-color disable-border');

		$('#basic-collapse').collapse('show');
		//$('#detail-collapse').collapse('show');
	} else {
    type = 'stop';
    $('#control-btn').removeClass('glyphicon-play');
  	$('#control-btn').addClass('glyphicon-pause');
		$('#control-btn').addClass('disable-background-color disable-border');
    $('#control-btn').text('Stop');

		$('#basic-btn').addClass('disable-background-color disable-font-color disable-border');
		$('#basic-collapse').collapse('hide');
	}
}

var type = 'start'; // or stop
function buttonTypeJudge() {
	if (type === 'start') {
		leaningStart();
	} else {
		leaningStop();
	}
}

var countTicker = new Ticker();
var learningTicker = new Ticker();
function leaningStart() {
	var studyMode = $("[name='study_mode']").is(":checked");

	if ($("[name='visual_mode']").is(":checked")) {
		switchVisual(false);
	}

  var displayFields = [];
  $("select#fields option:selected").each(function () {
    var targetField = $(this).val();

    for (var key in dicData) {
      var data = dicData[key];

      if(targetField == data['TAG']){
        displayFields.push({title: key, detail: data['DETAIL']});
      }
    }
  });

	$('#navi-word').text('3');
	countTicker = new Ticker();
	countTicker.intervalFor(function (count) {
		$('#navi-word').text(3 - count);
	}, 3);
	countTicker.run(function () {
		$('#navi-word').text('\u00a0');
		learningTicker = new Ticker();
		learningTicker.interval = $('#display-time').val();
		learningTicker.intervalFor(
			function (count) {
				try {
					var targetField = displayFields[count - 1];
					$('#title').text(targetField['title']);
					$('#detail').text(targetField['detail']);
				} catch (e) {
					//nothing
				}
			}, displayFields.length);
		learningTicker.run(function () {
      $('#navi-word').text('Let\s retry!');

      if ($("[name='visual_mode']").is(":checked")) {
    		switchVisual(true);
    	}
		}, true);
	});
}

function leaningStop() {
	countTicker.exit();
	learningTicker.exit();

  if ($("[name='visual_mode']").is(":checked")) {
    switchVisual(true);
  }
}
