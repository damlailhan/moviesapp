import React, { useEffect, useState, setState, Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
import img404 from "../src/img/img404.jpg";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };

    this.aramaYap = this.aramaYap.bind(this);
  }
  // axios
  //   .get("https://www.omdbapi.com/?apikey=6a8e2b9b&son&page=1")
  //   .then((response) => setMovies(response.data.Search));

  aramaYap() {
    var txtSearch = document.getElementById("txtSearch");

    axios
      .get("https://www.omdbapi.com/?apikey=6a8e2b9b&s=" + txtSearch.value)
      .then((response) => {
        if (response.data.Response == "False") {
          alert(response.data.Error);
          return;
        }

        this.setState({ movies: response.data.Search });
      });
  }

  render() {
    const { movies } = this.state;
    console.log(this.state);
    return (
      <div className="container site">
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              MOVİESAPP
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
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="searchbutton">
                  <div className="container-fluid">
                    <form className="d-flex" role="search">
                      <input
                        className="form-control me-2"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        id="txtSearch"
                      />

                      <button
                        className="btn btn-outline-success"
                        type="button"
                        onClick={() => {
                          this.aramaYap();
                        }}
                      >
                        Search
                      </button>
                    </form>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="col-md-12 ">
          {movies?.map((movie, i) => {
            return (
              <div
                key={movie.Title + "_" + i}
                className="col-md-4 col-sm-5 filmbox"
              >
                {movie.Poster === "N/A" ? (
                  <img src={img404} className="img404" />
                ) : (
                  <img src={movie.Poster} className="img" />
                )}

                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <a href="#" className="btn btn-primary">
                    Filmi izle
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
