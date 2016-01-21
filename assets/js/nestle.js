(function() {
	$(function() {
		
		/* 初始化 */
		var $oShare = $('#mast-share');
		$oShare.removeClass('hide');
		/*$('body').bind('touchmove',function(e){
			e.preventDefault();
		});*/
		
		/* 分享 */
		var $mastClose = $('.mast-close');
		$mastClose.on('click',function(){
			//$oShare.addClass('hide');
			$oShare.hide();
			$('body').unbind('touchmove');
		});
		
		//---------------- 第二版 -------------------
		/* 初始化  */
		var $codeShare = $('#code-share');
		$codeShare.removeClass('hide');
		/*$('body').bind('touchmove',function(e){
			e.preventDefault();
		});*/
		
		/* 关注 */
		var $codeClose = $('.code-close');
		$codeClose.on('click',function(){
			//$codeShare.addClass('hide');
			$codeShare.hide();
			$('body').unbind('touchmove');
		});
		
		var $aBtns = $('.cont-btn').find('.btn');
		$aBtns.eq(1).on('click',function(){
			$oShare.show();
		});
		
	});
})();