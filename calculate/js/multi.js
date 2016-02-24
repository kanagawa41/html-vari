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
	$('#number_of_steps').text('Let\'s calculate!');
	if ($("[name='visual_mode']").is(":checked")) {
		switchVisual(true);
	}
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
			$('#number_of_steps').text('Finish');
		}, true);
	});
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