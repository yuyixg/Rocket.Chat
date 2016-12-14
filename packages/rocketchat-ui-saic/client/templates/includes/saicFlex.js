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

saicRendered = function (self) {

//	$('.fixed-title').css("display", "none");
	$('.flex-tab-bar').css("width", "0px");
	$('.main-content').css("right", "0px");
	$('.page-container .content').css("padding","5px 5px");
	//$('.page-container .content').css('margin-top', '0px');
	//$('.page-container .content').css('margin-bottom', '0px');
	if (self.view.isRendered) {
        $(function () {
            MeteorAdminLTE.run()
        });
    }

}
