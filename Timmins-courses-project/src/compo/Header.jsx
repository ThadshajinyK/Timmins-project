import Logo from '../assets/logo.jpeg';

function Header() {
  return (
    <div className="container-fluid line">
      <nav className="navbar navbar-expand-md">
        
          <a className="navbar-brand" href="https://timmins-consulting.com/">
            <img className="logoImage"src={Logo} alt="timmins logo" />
          </a> 
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" target="_blank" href="https://timmins-consulting.com/" >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" target="_blank" href="https://timmins-consulting.com/timmins-corporate-training/">
                  Training
                </a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link"  href="/courses">
                  Courses
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" target="_blank" href="https://timmins-consulting.com/events/">
                  Events
                </a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="/contact">
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
