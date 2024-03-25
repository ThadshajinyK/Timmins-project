import cover from "../assets/coverpage.png";
import DisplayCourses from "./DisplayCourses";

function Courses() {
  return (
    <div>
      <img
        className="coursesCoverImg"
        src={cover}
        alt="courses cover page img"
      />
      <div className="container">
        {/* cards for each courses */}
        <DisplayCourses/>
      </div>
    </div>
  );
}

export default Courses;
