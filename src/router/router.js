import { createRouter, createWebHashHistory } from 'vue-router'

const routes = 
[
  {
    name : 'home',
    path : '/',
    component : () => import(/*webpackChunkName : "HomeComponent"*/ '@/modules/shared/pages/Home')
  },
  {
    name : 'categorias',
    path : '/categorias',
    component : () => import(/*webpackChunkName : "CategoriasComponent" */ '@/modules/categoria/components/HomeCategoria'),
    children : 
    [
      {
        name : 'categorias-menu',
        path : '',
        component : () => import(/*webpackChunkName : "CategoriasMenuComponent"*/ '@/modules/categoria/components/OptionsCategoria')
      },
      {
        name : 'lista-categorias',
        path : 'lista-categorias',
        component : () => import(/*webpackChunkName : "ListCategoriasComponent"*/ '@/modules/categoria/pages/ListCategorias')
      },
      {
        name : 'crear-categoria',
        path : 'crear-categoria',
        component : () => import(/*webbpackChunkName : "CrearCategoriaComponent"*/ '@/modules/categoria/pages/CrearCategoria')
      },
      {
        name : 'editar-categoria',
        path : 'editar-categoria/:id',
        props : (route) => 
        {
          const id = route.params.id;
          return isNaN( Number(id) ) ? { id : 1 } : { id : Number(id)}
        },
        component : () => import(/*webpackChunkName : "EditarCategoriaComponent" */ '@/modules/categoria/pages/EditarCategoria')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
})

export default router
