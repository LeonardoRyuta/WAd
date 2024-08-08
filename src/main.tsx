import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing, Create, Advertiser, User, Feed } from './pages'
import { Navbar } from './components'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className='w-full'>
    <React.StrictMode>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/create" element={<Create />} />
            <Route path="/create/advertiser" element={<Advertiser />} />
            <Route path="/create/user" element={<User />} />
            <Route path="/feed" element={<Feed />} />
          </Routes>
        </div>
      </BrowserRouter>
    </React.StrictMode >
  </div>
)
