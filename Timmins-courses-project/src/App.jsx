import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./compo/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Courses from "./compo/Courses";
import Footer from "./compo/Footer";
import DisplayCourseDetails from "./compo/DisplayCourseDetails";
import { ContactUs } from "./compo/ContactUs";
import AddCourse from "./compo/AddCourse";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/courses" element = {<Courses/>}></Route>
        <Route path="/displayCourse/:courseID" element = {<DisplayCourseDetails/>}></Route>
        <Route path="/contact" element = {<ContactUs/>}></Route>
        <Route path="/addCourse" element = {<AddCourse/>}></Route>

      </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
