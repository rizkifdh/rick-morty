import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

const Layout: React.FC = () => {
  const currentDate = new Date();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="root">
        <Outlet />
        <ScrollToTop />
      </div>
      <div className="divider p-5"></div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content sticky top-[100vh] md:text-xl">
        <aside>
          <p>
            Copyright © {currentDate.getFullYear()} -{" "}
            <a
              href="https://rizki-fadilah.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              Rizki Fadilah
            </a>
          </p>
          <p>
            data provided by{" "}
            <a
              href="https://rickandmortyapi.com/documentation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              Rick and Morty API
            </a>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Layout;
