import React from "react";

const Footer = () => {
  return (
    <div className="z-10">
      <footer className="footer lg:p-10 p-4 bg-white border-none  dark:bg-[#121212] py-16  border theme-text">
        <aside className="lg:w-[350px] flex flex-col items-center justify-center">
          <h1 className="px-16 font-KaushanScript text-5xl theme-text">
            ArtoGram
          </h1>
          <p className="text-xl text-center font-VarelaRound theme-text italic">
            ArtoGram is trusted online school by which you can get Art Tutorial
            and enroll course.
          </p>
        </aside>
        <nav className="text-base font-VarelaRound">
          <header className="footer-title ">Services</header>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>

        <nav className="text-base font-VarelaRound">
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer footer-center p-4 text-base font-VarelaRound font-bold dark:bg-black dark:text-white">
        <aside>
          <p>
            Copyright © 2023 - All right reserved by{" "}
            <span className="theme-text">ArtoGram</span> Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
