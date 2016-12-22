saicRendered = function (self) {

	//	$('.fixed-title').css("display", "none");
	$('.flex-tab-bar').css("width", "0px");
	$('.main-content').css("right", "0px");
	$('.page-container .content').css("padding", "2px 5px 0px 10px");
	//$('.page-container .content').css('margin-top', '0px');
	//$('.page-container .content').css('margin-bottom', '0px');
	if (self.view.isRendered) {
		$(function () {
			MeteorAdminLTE.run()
		});
	}

}

!function ($) {
	'use strict';
	$.fn.disable = function () {
		/// <summary> 
		/// 屏蔽所有元素 
		/// </summary> 
		/// <returns type="jQuery" /> 
		return $(this).find("*").each(function () {
			console.log(this);
			$(this).attr("disabled", "disabled");

		});
	}
	$.fn.enable = function () {
		/// <summary> 
		/// 使得所有元素都有效 
		/// </summary> 
		/// <returns type="jQuery" /> 
		return $(this).find("*").each(function () {
			$(this).removeAttr("disabled");
		});
	}

} (jQuery)