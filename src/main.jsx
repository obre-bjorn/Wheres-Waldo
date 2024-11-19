import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import GamePage from './pages/GamePage.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path:'/',
        element: <HomePage/>
      },
      {
        path:'/game/:game',
        element: <GamePage/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
