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
import CourseCategories from "../pages/HomePage/categories";
import CourseBar from "../pages/User/courseBar";
// Newly added pages
import CongratulationsPage from "../pages/InsideCourse/congratulationsPage";
import RewardsPage from "../pages/InsideCourse/rewardsPage";
import CollaborateProjects from "../pages/collaborate/collaborateProjects";
import Events from "../pages/events/events";
import AddCollaborateProjects from "../pages/collaborate/addCollaborateProjects";
import AddEvents from "../pages/events/addEvents";
import CollaborateSlug from "../pages/collaborate/collaborateSlug";
import EventsSlug from "../pages/events/eventSlug";
const Index = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<IndexPage />}></Route>
        <Route path="/about" element={<About />}></Route>
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
        <Route path="/manage-course" element={<ManageCourse/>}></Route>
        <Route path="/ins-courses" element={<InsCourses/>}></Route>
        {/* <Route path='/courses' element={<Courses />}></Route> */}
        {/* Additional pages here */}
        <Route path="/checkout/:courseId" element={<Payment />}></Route>
        <Route path="/congratulations" element={<CongratulationsPage />}></Route>
        <Route path="/rewards" element={<RewardsPage />}></Route>
        <Route path="/collaborate-projects" element={<CollaborateProjects />}></Route>
        <Route path="/events" element={<Events />}></Route>
        <Route path="/add-collaborate-projects" element={<AddCollaborateProjects />}></Route>
        <Route path="/add-events" element={<AddEvents />}></Route>
        <Route path="/collaborate-one" element={<CollaborateSlug />}></Route>
        <Route path="/event-one" element={<EventsSlug />}></Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Index;
