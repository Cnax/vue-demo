import Router from 'vue-router';

import routes from './routes';

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // 基础路径
    // base: '',
    // linkActiveClass: '',
    // linkExactActiveClass: '',
    // 保存页面切换的状态
    // scrollBehavior (to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition;
    //   }
    //   return { x: 0, y: 0 };
    // },
    // parseQuery (query) {

    // },
    // stringifyQuery (obj) {

    // },
    // 自动处理路由不兼容的问题
    fallback: true,
  });
};
