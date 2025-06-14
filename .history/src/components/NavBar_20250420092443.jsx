

const NavBar = () => {
  const navigate = useNavigate();

  const topics = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology"
  ];

  

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">NewsApp</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/weather">Weather</a>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                News Topics
              </a>
              <ul className="dropdown-menu">
                {topics.map(topic => (
                  <li key={topic}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleTopicClick(topic)}
                    >
                      {topic.charAt(0).toUpperCase() + topic.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search news..." aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
