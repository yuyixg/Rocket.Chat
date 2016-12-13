Template.saicFlex.helpers({
	active(...routes) {
		FlowRouter.watchPathChange();
		if (routes.indexOf(FlowRouter.current().route.name) !== -1) {
			return 'active';
		}
	}
});

Template.saicFlex.events({
	'mouseenter header'() {
		SideNav.overArrow();
	},

	'mouseleave header'() {
		SideNav.leaveArrow();
	},

	'click header'() {
		SideNav.closeFlex();
	}
});

saicRendered = function () {
    $('.fixed-title').css("display", "none");
    $('.flex-tab-bar').css("width", "0px");
    $('.main-content').css("right", "0px");
    $('.page-container .content').css('margin-top','0px');
}
