taskManagerRoutes = FlowRouter.group({
    prefix: '/task-manager',
    name: 'task-manager'
});
issueRoutes = FlowRouter.group({
    prefix: '/issue',
    name: 'issue'
});

AccountBox.addRoute({
    name: 'issue-index',
    path: '/index',
    sideNav: 'taskFlex',
    i18nPageTitle: '问题',
    pageTemplate: 'issueindex'
}, issueRoutes);

AccountBox.addRoute({
    name: 'task-list',
    path: '/task-list',
    sideNav: 'taskFlex',
    i18nPageTitle: '任务列表',
    pageTemplate: 'tasksList'
}, taskManagerRoutes);

AccountBox.addRoute({
    name: 'createtask',
    path: '/create',
    sideNav: 'taskFlex',
    i18nPageTitle: '新建任务',
    pageTemplate: 'taskSubmit'
}, taskManagerRoutes);

AccountBox.addRoute({
	name: 'task-edit',
	path: '/departments/:_id/edit',
	sideNav: 'taskFlex',
	i18nPageTitle: '修改任务',
	pageTemplate: 'taskSubmit'
}, taskManagerRoutes);