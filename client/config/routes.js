export default [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "todo" */ '../views/todo/todo.vue'),
  },
  {
    path: '/app',
    component: () => import(/* webpackChunkName: "todo" */ '../views/todo/todo.vue'),
    meta: {
      title: 'this is app',
      description: 'this is app description',
    },
    children: [
      {
        path: ':id',
        props: true,
        component: () => import(/* webpackChunkName: "todo" */ '../views/todo/todo.vue'),
        meta: {
          title: 'this is app',
          description: 'this is app description',
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue'),
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound.jsx'),
  },
];
