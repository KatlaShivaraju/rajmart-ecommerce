import React, { useEffect, useState } from "react";

const Navbar = ({ cartCount = 0 }) => {
  const getInitialTheme = () => {
    return localStorage.getItem("theme") || "light-theme";
  };

  const [theme, setTheme] = useState(getInitialTheme());
  const [search, setSearch] = useState("");

  const toggleTheme = () => {
    const newTheme =
      theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <header>
      <nav className="navbar navbar-expand-lg fixed-top bg-dark navbar-dark">
        <div className="container-fluid">

          {/* 🛒 Logo */}
          <a className="navbar-brand fw-bold" href="/">
            🛒 RAJMART
          </a>

          {/* Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">

            {/* Left Links */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/add_product">
                  Add Product
                </a>
              </li>
            </ul>

            {/* 🔍 Search */}
            <form className="d-flex me-3">
              <input
                className="form-control"
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            {/* 🌙 Theme Toggle */}
            <button
              className="btn btn-outline-light me-3"
              onClick={toggleTheme}
            >
              {theme === "dark-theme" ? "🌙" : "☀️"}
            </button>

            {/* 🛒 Cart */}
            <div className="text-white fw-bold">
              🛒 Cart ({cartCount})
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
