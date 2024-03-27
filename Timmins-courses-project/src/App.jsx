import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./compo/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Courses from "./compo/Courses";
import Footer from "./compo/Footer";
import Enrollment from "./compo/Enrollment";
import { ContactUs } from "./compo/ContactUs";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/courses" element = {<Courses/>}></Route>
        <Route path="/enroll/:courseID" element = {<Enrollment/>}></Route>
        <Route path="/contact" element = {<ContactUs/>}></Route>

      </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
