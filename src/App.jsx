import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Coins from './pages/Coins';
import HomePage from './pages/HomePage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/coins/:id",
    element: <Coins/>,
  },
]);
function App() {

  return (
    <>
      <Header/>
     <RouterProvider router={router} />
    </>
  )
}

export default App
