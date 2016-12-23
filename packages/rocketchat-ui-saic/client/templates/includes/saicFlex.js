
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

