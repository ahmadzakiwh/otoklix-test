import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPosts from "../pages/allPosts/AllPosts"
import Navbar from "../components/navbar/Navbar";

export default function Routess() {
  return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={
              <div className='pb-4'>
                <Navbar/>
                <AllPosts/>
              </div>
            } />
        </Routes>
      </BrowserRouter>
  )
}
