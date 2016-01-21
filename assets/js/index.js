(function() {

	//阻止默认行为
	$(document).on('touchmove', function(ev) {
		ev.preventDefault();
	});

	$(function() {

		var $oContainer = $('.container');
		var $aSection = $oContainer.find('.section');
		var viewHeight = $(window).height();
		$oContainer.height(viewHeight);

		showLoading();
		fnSlideSection();

		// 滑屏操作
		function fnSlideSection() {

			var startY = 0,
				step = 1 / 4,
				currIndex = 0,
				nextOrPrevIndex = 0,
				btnOff = true;

			$aSection.on('touchstart', function(ev) {

				if (btnOff) {

					btnOff = false;
					var touch = ev.originalEvent.changedTouches[0];
					startY = touch.pageY;
					currIndex = $(this).index();

					$aSection.on('touchmove.move', function(ev) {

						var touch = ev.originalEvent.changedTouches[0];
						$(this).siblings().hide();
						if (touch.pageY < startY) { //向上滑动
							nextOrPreIndex = currIndex == $aSection.length - 1 ? 0 : currIndex + 1;
							$aSection.eq(nextOrPreIndex).css('transform', 'translateY(' + (viewHeight + touch.pageY - startY) + 'px)');
						} else { //向下滑动							
							nextOrPreIndex = currIndex == 0 ? $aSection.length - 1 : currIndex - 1;
							$aSection.eq(nextOrPreIndex).css('transform', 'translateY(' + (-viewHeight + touch.pageY - startY) + 'px)');
						}
						$aSection.eq(nextOrPreIndex).show().addClass('zIndex');
						$(this).css('transform', 'translateY(' + (touch.pageY - startY) * step + 'px)');

						$aSection.on('touchend.move', function(ev) {
							var touch = ev.originalEvent.changedTouches[0];
							if (touch.pageY < startY) { //向上滑动
								$aSection.eq(currIndex).css('transform', 'translateY(' + (-viewHeight * step) + 'px)');
							} else { //向下滑动
								$aSection.eq(currIndex).css('transform', 'translateY(' + (viewHeight * step) + 'px)');
							}
							$aSection.eq(currIndex).css('transition', '0.3s');
							$aSection.eq(nextOrPreIndex).css('transform', 'translateY(0)');
							$aSection.eq(nextOrPreIndex).css('transition', '0.3s');
							$aSection.off('.move');
						});

					});
				}

			});

			//动画完成后触发
			$aSection.on('transitionEnd webkitTransitionEnd', function(ev) {
				if (!$aSection.is(ev.target)) {
					return;
				}
				resetFn();
				if (arrAnimate[currIndex]) {
					arrAnimate[currIndex].outAn();
				}
				if (arrAnimate[nextOrPreIndex]) {
					arrAnimate[nextOrPreIndex].inAn();
				}
			});

			function resetFn() {
				$aSection.css('transform', '').css('transition', '').eq(nextOrPreIndex).removeClass('zIndex').siblings().hide();
				btnOff = true;
			}

		}

		var arrAnimate = [{
			inAn: function() {
				setTimeout(function() {
					var $oImg = $aSection.eq(0).find('.title').find('img');
					$oImg.css('transition', '1s');
					$oImg.css('transform', 'rotateY(720deg)');
				}, 100);
				setTimeout(function() {
					var $oTip = $aSection.eq(0).find('.tip').find('img');
					$oTip.css({
						'transition': '1s',
						'-webkit-transform': 'scale(1)',
						'transform': 'scale(1)'
					});
				}, 1100);
			},
			outAn: function() {
				var $oImg = $aSection.eq(0).find('.title').find('img');
				$oImg.css('transition', '');
				$oImg.css('transform', '');
				var $oTip = $aSection.eq(0).find('.tip').find('img');
				$oTip.css({
					'transition': '',
					'-webkit-transform': 'scale(0)',
					'transform': 'scale(0)'
				});
			}
		}, {
			inAn: function() {
				setTimeout(function() {
					var $oTip = $aSection.eq(1).find('.tip').find('img');
					$oTip.css({
						'transition': '1s',
						'-webkit-transform': 'scale(1)',
						'transform': 'scale(1)'
					});
				}, 100);
			},
			outAn: function() {
				var $oTip = $aSection.eq(1).find('.tip').find('img');
				$oTip.css({
					'transition': '',
					'-webkit-transform': 'scale(0)',
					'transform': 'scale(0)'
				});
			}
		}];

		$.each(arrAnimate, function(index, obj) {
			obj.outAn();
		});

		function showLoading() {
			var arrImg = ['body_bg.jpg', 'logo.png', 'section1_bottom_bg.png', 'section1_heart.png', 'section1_tip.png', 'section1_title_bg.png', 'section2_bg.png', 'section2_left_hand.png', 'section2_left_hand_music.png', 'section2_right_hand.png', 'section2_right_hand_music.png', 'section2_tip1.png', 'section2_tip2.png', 'arrow_up.png'];
			var num = 0;
			$.each(arrImg, function(index, obj) {
				var objImg = new Image();
				objImg.src = 'assets/imgs/' + obj;
				objImg.onload = function() {
					num++;
					if (num == arrImg.length) {
						$('#loading').animate({
							opacity: 0
						}, 1000, function() {
							$(this).remove();
							// 首屏入场动画
							arrAnimate[0].inAn();
						});
					}
				};
				//图片加载错误或不全
				objImg.onerror = function() {
					$('#loading').animate({
						opacity: 0
					}, 1000, function() {
						$(this).remove();
						// 首屏入场动画
						arrAnimate[0].inAn();
					});
				};
			});
		}


	});

})();