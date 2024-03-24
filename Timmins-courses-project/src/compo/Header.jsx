import Logo from '../assets/logo.jpeg';

function Header() {
  return (
    <div className="container-fluid line">
      <nav className="navbar navbar-expand-md">
        
          <a className="navbar-brand" href="#">
            <img className="logoImage"src={Logo} alt="timmins logo" />
          </a> 
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
            <ul className="  navbar-nav ">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Training
                </a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Courses
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Blog
                </a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        
      </nav>
    </div>
  );
}

export default Header;
