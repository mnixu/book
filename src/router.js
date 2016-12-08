export default [
  {
    path: '/',
    name: 'index',
    component: (resolve) => {
      require(['./views/index'], resolve)
    } 
  }, 
  {
    path: '/index',
    name: 'index', 
    component: (resolve) => {
      require(['./views/index'], resolve)
    } 
  }, 
  {
    path: '/detail', 
    component: (resolve) => {
      require(['./views/bookDetail'], resolve)
    } 
  },
  {
    path: '*',
    component: (resolve) => {
      require(['./views/index'], resolve)
    } 
  }
]

