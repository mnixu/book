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
    path: '/detail/:id', 
    component: (resolve) => {
      require(['./views/bookDetail'], resolve)
    } 
  },   
  {
    path: '/detailMore/:id', 
    name: 'detailMore',
    component: (resolve) => {
      require(['./views/bookDetailMore'], resolve)
    }, 
  },  
  {
    path: '/detailMore/book/:id', 
    name: 'content',
    component: (resolve) => {
      require(['./views/bookContent'], resolve)
    } 
  },  
  {
    path: '*',
    component: (resolve) => {
      require(['./views/index'], resolve)
    } 
  }
]

