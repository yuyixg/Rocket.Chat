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
    i18nPageTitle: '岗位选择',
    pageTemplate: 'positionchoice'
}, dlmManagerRoutes);

AccountBox.addRoute({
    name: 'proxy',
    path: '/proxy/index',
    sideNav: 'saicDLM',
    i18nPageTitle: '代理操作',
    pageTemplate: 'proxy'
}, dlmManagerRoutes);

AccountBox.addRoute({
    name: 'staffcheck',
    path: '/staffcheck/index',
    sideNav: 'saicDLM',
    i18nPageTitle: '人员审核',
    pageTemplate: 'staffcheck'
}, dlmManagerRoutes);

AccountBox.addRoute({
    name: 'staffdetail',
    path: '/staffcheck/index/:_id',
    sideNav: 'saicDLM',
    i18nPageTitle: '人员信息',
    pageTemplate: 'staffdetail'
}, dlmManagerRoutes);

AccountBox.addRoute({
    name: 'salecheck',
    path: '/salecheck/index',
    sideNav: 'saicDLM',
    i18nPageTitle: '实销审核',
    pageTemplate: 'salecheck'
}, dlmManagerRoutes);

AccountBox.addRoute({
    name: 'report',
    path: '/report/index',
    sideNav: 'saicDLM',
    i18nPageTitle: '报表',
    pageTemplate: 'report'
}, dlmManagerRoutes);
