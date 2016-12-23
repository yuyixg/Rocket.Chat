AccountBox.addItem({
	name: 'FDApp',
	icon: 'icon-chat-empty',
	href: 'fddefault',
	sideNav: 'saicFDApp'
});


fdappManagerRoutes = FlowRouter.group({
    prefix: '/fdapp',
    name: 'fdapp-manager'
});


AccountBox.addRoute({
    name: 'fddefault',
    path: '/Default/default',
    sideNav: 'saicFDApp',
    i18nPageTitle: '首页',
    pageTemplate: 'fddefault'
}, fdappManagerRoutes);

AccountBox.addRoute({
    name: 'ARRequest',
    path: '/Apply/ARRequest',
    sideNav: 'saicFDApp',
    i18nPageTitle: 'New AR Request',
    pageTemplate: 'ARRequest'
}, fdappManagerRoutes);

AccountBox.addRoute({
    name: 'ERRequest',
    path: '/Apply/ERRequest',
    sideNav: 'saicFDApp',
    i18nPageTitle: 'New ER Request',
    pageTemplate: 'ERRequest'
}, fdappManagerRoutes);

AccountBox.addRoute({
    name: 'GRRequest',
    path: '/Apply/GRRequest',
    sideNav: 'saicFDApp',
    i18nPageTitle: 'New GR Request',
    pageTemplate: 'GRRequest'
}, fdappManagerRoutes);

AccountBox.addRoute({
    name: 'PRRequest',
    path: '/Apply/PRRequest',
    sideNav: 'saicFDApp',
    i18nPageTitle: 'New PR Request',
    pageTemplate: 'PRRequest'
}, fdappManagerRoutes);

AccountBox.addRoute({
    name: 'TRRequest',
    path: '/Apply/TRRequest',
    sideNav: 'saicFDApp',
    i18nPageTitle: 'New TR Request',
    pageTemplate: 'TRRequest'
}, fdappManagerRoutes);

AccountBox.addRoute({
    name: 'AREdit',
    path: '/View/AREdit',
    sideNav: 'saicFDApp',
    i18nPageTitle: 'AR View',
    pageTemplate: 'AREdit'
}, fdappManagerRoutes);

AccountBox.addRoute({
    name: 'EREdit',
    path: '/View/EREdit',
    sideNav: 'saicFDApp',
    i18nPageTitle: 'ER View',
    pageTemplate: 'EREdit'
}, fdappManagerRoutes);

AccountBox.addRoute({
    name: 'GREdit',
    path: '/View/GREdit',
    sideNav: 'saicFDApp',
    i18nPageTitle: 'GR View',
    pageTemplate: 'GREdit'
}, fdappManagerRoutes);

AccountBox.addRoute({
    name: 'PREdit',
    path: '/View/PREdit',
    sideNav: 'saicFDApp',
    i18nPageTitle: 'PR View',
    pageTemplate: 'PREdit'
}, fdappManagerRoutes);

AccountBox.addRoute({
    name: 'TREdit',
    path: '/View/TREdit/:_id',
    sideNav: 'saicFDApp',
    i18nPageTitle: 'TR View',
    pageTemplate: 'TREdit'
}, fdappManagerRoutes);


