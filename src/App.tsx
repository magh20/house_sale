/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login";
import MainPage from "./pages/mainPage";
import Register from "./pages/auth/register";

interface MyContextValue {
  access: string;
}
function App() {
  // const { access } = useContext(myContext) as MyContextValue;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/auth/login" element={<Login />} />

          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
