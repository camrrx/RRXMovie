//Stateless Functional Component (scf to create easily the function)
import "./home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  const goToSearch = () => {
    this.router.navigate(["/search"], {
      queryParams: { search: this.searchForm.controls["search"].value },
    });
  };

  return (
    <div className="home-container">
      <div className="header">
        <div className="header-end">
          <h2>à propos</h2>
          <h2>Contact</h2>
          <button>Hello</button>
        </div>
      </div>
      <div className="title-container">
        <h1 className="title">RrX | </h1>
        <p>
          <small>The</small> Movie Ratings App
        </p>
      </div>
      <img src={require("./interstellar.jpg")} alt="interstellar" />
      <form className="search-container">
        <Link to="/search">
          <button className="search-input">
            <h className="click-start">Click here to start</h>
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Home;
