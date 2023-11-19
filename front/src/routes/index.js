import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home";

import JoinForm from "../pages/Comp/joinform";
import IndexPage from "../pages/indexPage";
import ForgotPass from "../pages/ResetPass/forgotPass";
import ResetPass from "../pages/ResetPass/resetPass";
const Index = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<IndexPage />}></Route>
        <Route path="/joinform" element={<JoinForm />}></Route>
        <Route path="/forgot-password" element={<ForgotPass />}></Route>
        <Route path="/reset-password" element={<ResetPass />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Index;
