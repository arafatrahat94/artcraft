import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-100 py-16 text-base-content border ">
        <aside className="w-[350px]">
          <h1 className="px-16 font-KaushanScript text-5xl theme-text">
            ArtoGram
          </h1>
          <p className="text-xl text-center font-VarelaRound theme-text italic">
            ArtoGram is trusted online school by which you can get Art Tutorial
            and enroll course.
          </p>
        </aside>
        <nav className="text-base font-VarelaRound">
          <header className="footer-title text-black">Services</header>
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
      <footer className="footer footer-center p-4 text-base font-VarelaRound font-bold">
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
