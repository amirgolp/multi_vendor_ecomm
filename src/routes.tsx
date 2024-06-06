import React from 'react'

import { useRoutes, RouteObject } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'

const routes: RouteObject[] = [
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }
]

export const AppRoutes: React.FC = () => {
  return useRoutes(routes)
}

export default routes
