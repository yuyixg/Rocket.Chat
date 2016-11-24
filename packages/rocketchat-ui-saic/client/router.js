saicManagerRoutes = FlowRouter.group({
    prefix: '/saic',
    name: 'task-manager'
});

AccountBox.addRoute({
    name: 'knowledge-index',
    path: '/index',
    sideNav: 'saicFlex',
    i18nPageTitle: '知识库',
    pageTemplate: 'knowledgeindex'
}, saicManagerRoutes);

AccountBox.addRoute({
    name: 'knowledge-manager-index',
    path: '/knowledge/manager/index',
    sideNav: 'saicFlex',
    i18nPageTitle: '知识查询',
    pageTemplate: 'knowledgemanage'
}, saicManagerRoutes);

AccountBox.addRoute({
    name: 'knowledge-manager-index',
    path: '/knowledge/manager/index/:_id',
    sideNav: 'saicFlex',
    //i18nPageTitle: '知识Manage',
    pageTemplate: 'knowledgedetail'
}, saicManagerRoutes);

AccountBox.addRoute({
    name: 'task-list',
    path: '/task-list',
    sideNav: 'saicFlex',
    i18nPageTitle: '移动运营',
    pageTemplate: 'tasksList'
}, saicManagerRoutes);

AccountBox.addRoute({
    name: 'createtask',
    path: '/create',
    sideNav: 'saicFlex',
    i18nPageTitle: '新建任务',
    pageTemplate: 'taskSubmit'
}, saicManagerRoutes);

AccountBox.addRoute({
	name: 'task-edit',
	path: '/departments/:_id/edit',
	sideNav: 'saicFlex',
	i18nPageTitle: '修改任务',
	pageTemplate: 'taskSubmit'
}, saicManagerRoutes);