import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home";
import JoinForm from "../pages/Comp/joinform";
import InsJoin from "../pages/Instructor/ins_Join";
import IndexPage from "../pages/indexPage";
import ForgotPass from "../pages/ResetPass/forgotPass";
import ResetPass from "../pages/ResetPass/resetPass";
import Profile from "../pages/Profile/profile";
// import Courses from "../pages/Comp/courses";
import Payment from "../pages/User/payment";
import InsHome from "../pages/Instructor/ins-Home";
import ShowCourses from "../pages/User/showCourses";
import ShowAllCourses from "../pages/Instructor/showAllCourses";
import ManageCourse from "../pages/Instructor/manageCourse";

const Index = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<IndexPage />}></Route>
        <Route path="/ins-home" element={<InsHome />}></Route>
        <Route path="/joinform" element={<JoinForm />}></Route>
        <Route path="/ins-join" element={<InsJoin />}></Route>
        <Route path="/forgot-password" element={<ForgotPass />}></Route>
        <Route path="/reset-password" element={<ResetPass />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/show-courses" element={<ShowCourses/>}></Route>
        <Route path="/all-courses" element={<ShowAllCourses/>}></Route>
        <Route path="/manage-course" element={<ManageCourse/>}></Route>
        {/* <Route path='/courses' element={<Courses />}></Route> */}
        <Route path="/checkout/:courseId" element={<Payment />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Index;
