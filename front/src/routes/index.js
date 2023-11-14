import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/signin";
import SignupPage from "../pages/signup";
import Navbar from "../pages/Components/Navbar";
const Index = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path ="/nab" element={<Navbar />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Index;
