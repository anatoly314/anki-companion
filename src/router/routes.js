
const routes = [
  {
    path: '/',
    redirect: {
      name: 'epub'
    }
  },
  {
    path: '/epub',
    name: 'epub',
    component: () => import('pages/Epub.vue')
  },
  {
    path: '/markdown',
    name: 'markdown',
    component: () => import('pages/Markdown.vue')
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
