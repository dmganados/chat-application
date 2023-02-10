import React, { useState, useEffect } from "react";
// Implement page routing
// acquire the utilities from react-router-dom
import { BrowserRouter, Routes, Route} from 'react-router-dom'


// Acquire the pages that will make up the app
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Chat from './pages/chat/Chat';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;