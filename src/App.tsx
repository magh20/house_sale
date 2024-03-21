/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login";
import MainPage from "./pages/mainPage";
import Register from "./pages/auth/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./pages/createPost";
import Header from "./components/layout/Header";
import PostDetail from "./pages/postDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Header />

        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/auth/login" element={<Login />} />

          <Route path="/auth/register" element={<Register />} />

          <Route path="/createPost" element={<CreatePost />} />

          <Route path="/postDetail/:postId" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
