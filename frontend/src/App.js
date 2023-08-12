// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { UserProvider } from "./components/context/UserContext";
import ChatPage from "./components/chat/ChatPage";
import Login from "./components/login/Login";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chatPage" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
