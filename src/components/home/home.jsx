//Stateless Functional Component (scf to create easily the function)
import "./home.scss";

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
        <input className="search-input" type="text" />
        <button className="search-button">
          <span className="material-icons">search</span>
        </button>
      </form>
    </div>
  );
};

export default Home;
