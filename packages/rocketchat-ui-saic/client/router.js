saicManagerRoutes = FlowRouter.group({
    prefix: '/saic',
    name: 'task-manager'
});


AccountBox.addRoute({
    name: 'itinfo-index',
    path: '/itinfo/index',
    sideNav: 'saicFlex',
    i18nPageTitle: 'IT信息栏/公告栏',
    pageTemplate: 'itinfoindex'
}, saicManagerRoutes);

AccountBox.addRoute({
    name: 'itinfo-detail',
    path: '/itinfo/index/:_id',
    sideNav: 'saicFlex',
    //i18nPageTitle: 'IT信息栏Detail',
    pageTemplate: 'itinfodetail'
}, saicManagerRoutes);

AccountBox.addRoute({
    name: 'knowledge-index',
    path: '/knowledge/index',
    sideNav: 'saicFlex',
    i18nPageTitle: '知识库',
    pageTemplate: 'knowledgeindex'
}, saicManagerRoutes);


AccountBox.addRoute({
    name: 'knowledge-index',
    path: '/knowledge/index/:_id',
    sideNav: 'saicFlex',
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
    name: 'issue-index',
    path: '/issueindex',
    sideNav: 'saicFlex',
    i18nPageTitle: '我的提问',
    pageTemplate: 'issueindex'
}, saicManagerRoutes);
AccountBox.addRoute({
    name: 'issue-create',
    path: '/issuecreate',
    sideNav: 'saicFlex',
    i18nPageTitle: '新建问题',
    pageTemplate: 'issueSubmit'
}, saicManagerRoutes);

AccountBox.addRoute({
    name: 'issue-edit',
    path: '/issueedit/:_id',
    sideNav: 'saicFlex',
    i18nPageTitle: '编辑问题',
    pageTemplate: 'issueSubmit'
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