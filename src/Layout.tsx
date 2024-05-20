import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import bg from "./assets/bg.jpg";

const Layout: React.FC = () => {
  const currentDate = new Date();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <img src={bg} className="opacity-50 object-cover w-full h-full" />
      </div>
      <div className="w-full max-w-screen-md mx-auto flex flex-col bg-base-100 bg-opacity-80 items-center">
        <Header />
        <div id="root" className="flex-grow w-full ">
          <Outlet />
          <ScrollToTop />
        </div>
        <div className="divider p-5"></div>
        <footer className="footer footer-center p-4 bg-base-300 text-base-content fixed max-w-screen-md bottom-0 z-30">
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
    </div>
  );
};

export default Layout;
