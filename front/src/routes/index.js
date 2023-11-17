import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home";
//import LoginPage from "../pages/Comp/signin";
//import SignupPage from "../pages/Comp/signup";
import JoinForm from "../pages/Comp/joinform";
const Index = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/joinform" element={<JoinForm />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Index;
