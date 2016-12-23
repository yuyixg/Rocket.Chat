Template.saicFDApp.helpers({
	active(...routes) {
		FlowRouter.watchPathChange();
		if (routes.indexOf(FlowRouter.current().route.name) !== -1) {
			return 'active';
		}
	}
});

Template.saicFDApp.events({
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

saicFDAppRendered = function (self) {

//	$('.fixed-title').css("display", "none");
	$('.flex-tab-bar').css("width", "0px");
	$('.main-content').css("right", "0px");
	$('.page-container .content').css("padding","2px 5px 0px 10px");
	//$('.page-container .content').css('margin-top', '0px');
	//$('.page-container .content').css('margin-bottom', '0px');
	if (self.view.isRendered) {
        $(function () {
            MeteorAdminLTE.run()
        });
    }

}
