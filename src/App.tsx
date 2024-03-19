/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login";
import MainPage from "./pages/mainPage";
import Register from "./pages/auth/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./pages/createPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/auth/login" element={<Login />} />

          <Route path="/auth/register" element={<Register />} />

          <Route path="/createPost" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
