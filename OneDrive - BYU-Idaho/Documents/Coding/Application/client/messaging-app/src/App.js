import React from "react";
// Implement page routing
// acquire the utilities from react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Acquire the pages that will make up the app
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}