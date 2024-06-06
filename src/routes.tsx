import React from 'react'

import { useRoutes, RouteObject } from 'react-router-dom'

import Login from './pages/Login'
import MainPage from './pages/MainPage.tsx'
import Signup from './pages/Signup'

const routes: RouteObject[] = [
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <MainPage />
  }
]

export const AppRoutes: React.FC = () => {
  return useRoutes(routes)
}

export default routes
