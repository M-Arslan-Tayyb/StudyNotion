import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AppLayout from "./layout/AppLayout"
import './App.css'
import HomePage from './pages/HomePage'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import VerifyEmail from "./pages/VerifyEmail"
import ForgotPassword from "./pages/ForgotPass"
import UpdatePassword from "./pages/updatePassword"
import About from "./pages/About"
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import OpenRoute from "./components/core/Auth/OpenRoute"
import  Contact  from "../src/pages/Contact"
import MyProfile from "../src/components/core/dashboard/MyProfile"
import Dashboard from "./pages/Dashboard"

function App() {
  const router = createBrowserRouter([
    {
      element:<AppLayout/>,//basically it is for outlet
      children:[
        {path:"/", element:<HomePage />},
        {
          path: "/login",
          element: (
            <OpenRoute>
              <Login />
            </OpenRoute>
          ),
        },
        {
          path: "/signup",
          element: (
            <OpenRoute>
              <Signup /> 
            </OpenRoute>
          ),
        },
        {
          path: "/verify-email",
          element: (
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          ),
        },
        {
          path: "/forgot-password",
          element: (
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          ),
        },
        {
          path: "/update-password/:id",
          element: (
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          ),
        },
        {path:"/about", element:<About />},
        {path:"/contact", element:<Contact />},

        {
          path: "/dashboard/my-profile",
          element: (
            <PrivateRoute>
              < Dashboard/>
            </PrivateRoute>
          ),
        },




        


      ]
    }

  ]
  )

  return (
    <RouterProvider router={router} />

  )
}

export default App
