import { Session } from 'meteor/session'
checkPermission = function (rolename) {
	var roles = Session.get('roles');
	console.log(roles);
	var flag = false;
	$.each(roles, function (i, r) {
	
		if (r.permission === rolename) {
			console.log('find');
			flag=true;
			return false;
			
		}
	});
	return flag;
}
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
	var roles = Session.get('roles');
	if (!roles) {
		Meteor.call("getroles", function (error, result) {
			// 向用户显示错误信息并终止
			if (error) {
				console.log(error);
				return;
			}
			console.log(result);
			Session.set('roles', result);
		})
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