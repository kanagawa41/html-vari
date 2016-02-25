function commonInit() {
	jQuery.fn.center = function () {
		this.css("position", "absolute");
		this.css("top", ($(window).height() - this.height()) / 2
			+ $(window).scrollTop() + "px");
		this.css("left", ($(window).width() - this.width()) / 2
			+ $(window).scrollLeft() + "px");
		return this;
	};
	$("#contents").center();

	bootstrapInit();
	multiInit();
}

function bootstrapInit() {
	$("[name='study_mode']").bootstrapSwitch();
	$("[name='expect_mode']").bootstrapSwitch();
	$("[name='visual_mode']").bootstrapSwitch();
}

function multiInit() {
	$('#content-top').after($('#multiplication_content'));

	sliderSetting();
	toggleSetting();
	remakeNumberCheckboxs();

	selectSetting();
	$("select#char_mode").change();
	$("select#x_target_step").change();
	$("select#y_target_step").change();

	multiReset();

	$('#detail-collapse').collapse('hide');

	$('#number_of_steps').text('Let\'s calculate!');
}

function sliderSetting(){
	$('#display_second').slider({
		tooltip: 'always',
		formatter: function(value) {
			return value + ' second';
		}
	});
}

function toggleSetting() {
	$("[name='expect_mode']").on('switchChange.bootstrapSwitch', function (event, state) {
		remakeNumberCheckboxs();

		$("select#x_target_step").change();
		$("select#y_target_step").change();
	});
}

function remakeNumberCheckboxs() {
	var expects = [];
	if ($("[name='expect_mode']").is(":checked")) {
		expects = [1, 10];
	}

	$('#x_choses_paragraphs').children().html('');
	makeNumberCheckboxs(1, 19, expects, $('#x_choses_paragraphs').children());

	$('#y_choses_paragraphs').children().html('');
	makeNumberCheckboxs(1, 19, expects, $('#y_choses_paragraphs').children());


}

function selectSetting() {
	$("select#char_mode").change(function () {
		$("select#char_mode option:selected").each(function () {
			var mode = $(this).val();
			if (mode === 'flat') {
				changeCharEmpasis('#number1', 'emphasis-1');
				changeCharEmpasis('#number2', 'emphasis-1');
				changeCharEmpasis('#result', 'emphasis-1');
			} else if (mode === 'dinamic-emphasis') {
				changeCharEmpasis('#number1', 'emphasis-1');
				changeCharEmpasis('#number2', 'emphasis-2');
				changeCharEmpasis('#result', 'emphasis-2');
			} else if (mode === 'emphasis') {
				changeCharEmpasis('#number1', 'emphasis-1');
				changeCharEmpasis('#number2', 'emphasis-2');
				changeCharEmpasis('#result', 'emphasis-3');
			} else {
				alert('Fatal char init.');
			}
		});
	});
	$("select#x_target_step").change(function () {
		$("select#x_target_step option:selected").each(function () {
			var mode = $(this).val();

			var parentElement = $('#x_choses_paragraphs .bizcontent input[type="checkbox"]');
			if (mode === 'all') {
				changeNumbers(parentElement, ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"]);
			} else if (mode === 'ten_upper') {
				changeNumbers(parentElement, ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19"]);
			} else if (mode === 'nine_under') {
				changeNumbers(parentElement, ["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
			} else if (mode === 'choses') {
				changeNumbers(parentElement, []);
			}
		});
	});

	$("select#y_target_step").change(function () {
		$("select#y_target_step option:selected").each(function () {
			var mode = $(this).val();

			var parentElement = $('#y_choses_paragraphs .bizcontent input[type="checkbox"]');
			if (mode === 'all') {
				changeNumbers(parentElement, ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"]);
			} else if (mode === 'ten_upper') {
				changeNumbers(parentElement, ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19"]);
			} else if (mode === 'nine_under') {
				changeNumbers(parentElement, ["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
			} else if (mode === 'choses') {
				changeNumbers(parentElement, []);
			}
		});
	});
}
function changeNumbers(parentElement, targets) {
	parentElement.each(function () {
		var number = $(this).val();
		if (targets.indexOf(number) > -1) {
			$(this).parent().parent().addClass('active');
		} else {
			$(this).parent().parent().removeClass('active');
		}
	});
}
function changeCharEmpasis(idOrClass, addClass) {
	$(idOrClass).removeClass('no-emphasis');
	$(idOrClass).removeClass('emphasis-1');
	$(idOrClass).removeClass('emphasis-2');
	$(idOrClass).removeClass('emphasis-3');
	$(idOrClass).addClass(addClass);
}
function calculateStop() {
	countTicker.exit();
	numberTicker.exit();
	multiReset();
}
function multiReset() {
	if ($("[name='visual_mode']").is(":checked")) {
		switchVisual(true);
	}
	$('#control_btn').removeClass('glyphicon-pause');
	$('#control_btn').addClass('glyphicon-play');
	$('#control_btn').text('Start');
	type = 'start';
}
function switchVisual(flag) {
	if (flag) {
		$('.progress').removeClass('disable-background-color');
		$('#calculate-progress')
			.removeClass('disable-background-color');
		$('#control_btn').removeClass('disable-background-color');
		$('#basic-btn').removeClass('disable-background-color disable-font-color disable-border');
		$('#basic-collapse').collapse('show');
		$('#detail-btn').removeClass('disable-background-color disable-font-color disable-border');
		//$('#detail-collapse').collapse('show');
	} else {
		$('.progress').addClass('disable-background-color');
		$('#calculate-progress').addClass('disable-background-color');
		$('#control_btn').addClass('disable-background-color');
		$('#basic-btn').addClass('disable-background-color disable-font-color disable-border');
		$('#basic-collapse').collapse('hide');
		$('#detail-btn').addClass('disable-background-color disable-font-color disable-border');
		$('#detail-collapse').collapse('hide');
	}
}
var type = 'start'; // or stop
function ButtonTypeJudge() {
	if (type === 'start') {
		calculateStart();
	} else {
		calculateStop();
	}
}

var countTicker = new Ticker();
var numberTicker = new Ticker();
function calculateStart() {
	var parentElement = $('#x_choses_paragraphs .btn');
	var xTargetNumbers = [];
	parentElement.each(function () {
		if ($(this).hasClass('active')) {
			xTargetNumbers.push($(this).find('[name="var_id[]"]').val());
		}
	});

	parentElement = $('#y_choses_paragraphs .btn');
	var yTargetNumbers = [];
	parentElement.each(function () {
		if ($(this).hasClass('active')) {
			yTargetNumbers.push($(this).find('[name="var_id[]"]').val());
		}
	});

	var studyMode = $("[name='study_mode']").is(":checked");
	var targetSteps = makeSteps_(xTargetNumbers, yTargetNumbers, studyMode);

	$('#control_btn').removeClass('glyphicon-play');
	$('#control_btn').addClass('glyphicon-pause');
	$('#control_btn').text('Stop');
	type = 'stop';
	$('#number1').text('X');
	$('#number2').text('Y');
	$('#result').text('Z');
	$('#calculate-progress').attr('aria-valuemax', targetSteps.length);
	$('#calculate-progress').attr('aria-valuenow', '0');
	$('#calculate-progress').css('width', '0%');
	if ($("[name='visual_mode']").is(":checked")) {
		switchVisual(false);
	}
	$('#number_of_steps').text('3');
	countTicker = new Ticker();
	countTicker.intervalFor(function (count) {
		$('#number_of_steps').text(3 - count);
	}, 3);
	countTicker.run(function () {
		$('#number_of_steps').text('\u00a0');
		numberTicker = new Ticker();
		numberTicker.interval = $('#display_second').val() * 1000;
		numberTicker.intervalFor(
			function (count) {
				try {
					var targetStep = targetSteps[count - 1];
					$('#number1').text(targetStep[0]);
					$('#number2').text(targetStep[1]);
					$('#result').text(targetStep[2]);
					$('#calculate-progress').attr('aria-valuenow',
						(count));
					$('#calculate-progress').css(
						'width',
						((count / targetSteps.length) * 100)
						+ '%');
				} catch (e) {
					//nothing
				}
			}, targetSteps.length);
		numberTicker.run(function () {
			multiReset();
			var count = $.cookie('count') != null ? parseInt($.cookie('count')) : 0;
			$.cookie('count', count + 1);

			$('#number_of_steps').text(getMessage(count + 1));
		}, true);
	});
}

var MESSAGES = {
	'1': '疑わずに最初の一段を登りなさい。階段のすべて見えなくてもいい。とにかく最初の一歩を踏み出すのです。'
	, '5': 'あなたにできること、あるいはできると夢見ていることがあれば、今すぐ始めなさい。向こう見ずは天才であり、力であり、魔法です。'
	, '10': 'じっくり考えろ。しかし、行動する時が来たなら、考えるのをやめて、進め。'
	, '20': '人生はどちらかです。勇気をもって挑むか、棒にふるか。'
	, '30': '成功があがりでもなければ、失敗が終わりでもない。肝心なのは、続ける勇気である。'
	, '40': '大きな失敗を恐れない者だけが、偉大なことを成し遂げる。'
	, '50': '何事も成功するまでは不可能に思えるものである。'
	, '60': 'どんな人間も、自分が思っている以上のことができる。'
	, '70': '強さとは、身体能力ではなく、不屈の精神から生まれるものだ。'
	, '80': '終始一貫、勇気勇気で押し切るのだ。'
	, '90': '今の状況がどれほど苦しく、救いのないものに思えても、それを変える道が必ずあることを分かってほしい。'
	, '100': 'すべては過程だ。結果ではない。'
};

function getMessage(count){
	var message = MESSAGES[count.toString()];

	if(message == null) return "Let's retry!";

	return message;
}

function makeNumberCheckboxs(min, max, expects, parent) {
	for (var i = min; i <= max; i++) {
		if (expects.indexOf(i) > -1) continue;

		makeNumberCheckbox(i, parent);
	}
}

function makeNumberCheckbox(value, parent) {
	parent.append('<div data-toggle="buttons" class="btn-group bizmoduleselect"><label class="btn btn-default"><div class="bizcontent"><input type="checkbox" name="var_id[]" value="' + value + '" autocomplete="off"><span class="glyphicon glyphicon-ok glyphicon-lg"></span><h2>' + value + '</h2></div></label></div>');
}

function makeSteps_(xs, ys, testFlag) {
	var gathers = [];
	for (var i = 0; i < xs.length; i++) {
		var x = xs[i];
		for (var j = 0; j < ys.length; j++) {
			var y = ys[j];
			if (testFlag) {
				var pair = [];
				pair.push(x);
				pair.push(y);
				pair.push('');
				gathers.push(pair);
				pair = [];
				pair.push(x);
				pair.push(y);
				pair.push(x * y);
				gathers.push(pair);
			} else {
				var pair = [];
				pair.push(x);
				pair.push(y);
				pair.push(x * y);
				gathers.push(pair);
			}
		}
	}
	return gathers;
}

function spaceFill(target, digit) {
	var different = digit - target.toString().length;
	if (different <= 0) {
		return target;
	}
	for (var i = 0; i < different; i++) {
		target = '\u00a0' + target.toString();
	}
	return target;
}