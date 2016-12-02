AccountBox.addItem({
	name: 'DLM-MAC',
	icon: 'icon-chat-empty',
	href: 'positionchoice',
	sideNav: 'saicDLM'
});

dlmManagerRoutes = FlowRouter.group({
    prefix: '/dlm',
    name: 'dlm-menu'
});

AccountBox.addRoute({
    name: 'positionchoice',
    path: '/positionchoice/index',
    sideNav: 'saicDLM',
    i18nPageTitle: 'PositionChoice',
    pageTemplate: 'positionchoicepage'
}, dlmManagerRoutes);

AccountBox.addRoute({
    name: 'proxy',
    path: '/proxy/index',
    sideNav: 'saicDLM',
    i18nPageTitle: 'Proxy',
    pageTemplate: 'proxypage'
}, dlmManagerRoutes);

AccountBox.addRoute({
    name: 'staffcheck',
    path: '/staffcheck/index',
    sideNav: 'saicDLM',
    i18nPageTitle: 'StaffCheck',
    pageTemplate: 'staffcheckpage'
}, dlmManagerRoutes);

AccountBox.addRoute({
    name: 'salecheck',
    path: '/salecheck/index',
    sideNav: 'saicDLM',
    i18nPageTitle: 'SaleCheck',
    pageTemplate: 'salecheckpage'
}, dlmManagerRoutes);

AccountBox.addRoute({
    name: 'report',
    path: '/report/index',
    sideNav: 'saicDLM',
    i18nPageTitle: 'Report',
    pageTemplate: 'reportpage'
}, dlmManagerRoutes);
