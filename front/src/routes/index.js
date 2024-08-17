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
import EnrolledCourses from "../pages/User/enrolledCourses";
import ShowAllCourses from "../pages/Instructor/showAllCourses";
import ManageCourse from "../pages/InsideCourse/manageCourse";
import InsCourses from "../pages/Instructor/insCourses";
import TakenCourses from "../pages/Instructor/takenCourses";
import About from "../pages/HomePage/about";
import Courses from "../pages/HomePage/courses";
import Service from "../pages/HomePage/service";
import Feature from "../pages/HomePage/Feature/feature";
import CourseCategories from "../pages/HomePage/categories";
import CourseBar from "../pages/User/courseBar";
import Resource from "../pages/Comp/resource";
import ProjectManagement from "../pages/InsideCourse/project";
import Event from "../pages/Comp/event";
import ProgressBar from "../pages/InsideCourse/progressBar";
import LiveSession from "../pages/InsideCourse/liveSession";
import FeedbackManagement from "../pages/InsideCourse/feedback";
import CreateCourse from "../pages/Instructor/createCourse";
import Layout from "../pages/layout";
import Instructors from "../pages/HomePage/instructors";
const Index = () => {
  return (
    <div>
      <BrowserRouter>
      <Layout>
        <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<IndexPage />}></Route>
        <Route path="/create-course" element={<CreateCourse />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/instructors" element={<Instructors />}></Route>
        <Route path="/feature" element={<Feature />}></Route>
        <Route path="/categories" element={<CourseCategories />}></Route>
        <Route path="/joinform" element={<JoinForm />}></Route>
        <Route path="/ins-join" element={<InsJoin />}></Route>
        <Route path="/forgot-password" element={<ForgotPass />}></Route>
        <Route path="/reset-password" element={<ResetPass />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/chat" element={<CourseBar />}></Route>
        <Route path="/enrolled-courses" element={<EnrolledCourses/>}></Route>
        <Route path="/taken-courses" element={<TakenCourses/>}></Route>
        <Route path="/all-courses" element={<ShowAllCourses/>}></Route>
        <Route path="/manage-course/:courseId" element={<ManageCourse/>}></Route>
        <Route path="/ins-courses" element={<InsCourses/>}></Route>
        {/* <Route path='/courses' element={<Courses />}></Route> */}
        <Route path="/resource/:courseId" element={<Resource />}></Route>
        <Route path="/checkout/:courseId" element={<Payment />}></Route>
        <Route path="/project/:courseId" element={<ProjectManagement />}></Route>
        <Route path="/progress/:courseId" element={<ProgressBar />}></Route>
        <Route path="/events" element={<Event />}></Route>
        <Route path="/live-Session/:courseId" element={<LiveSession />}></Route>
        <Route path="/feedback/:courseId" element={<FeedbackManagement />}></Route>
        </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default Index;
