import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./compo/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Courses from "./compo/Courses";
import Footer from "./compo/Footer";
import Enrollment from "./compo/Enrollment";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/courses" element = {<Courses/>}></Route>
        <Route path="/enroll/:courseID" element = {<Enrollment/>}></Route>
      </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
