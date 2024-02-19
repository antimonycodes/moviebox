import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";

const Footer = () => {
  return (
    <div className=" bg-black text-white">
      <div class=" text-center">
        <div class="flex items-center justify-center gap-5 pt-4">
          <a href="">
            <FaFacebook />
          </a>
          <a href="">
            <FaInstagram />
          </a>
          <a href="">
            <FaXTwitter />
          </a>
          <a href="">
            <CiYoutube />
          </a>
        </div>
        <div class="flex items-center justify-center gap-5 py-5">
          <a class="text-[12px] sm:text-base" href="">
            Conditions of Use
          </a>
          <a class="text-[12px] sm:text-base" href="">
            Privacy &amp; Policy
          </a>
          <a class="text-[12px] sm:text-base" href="">
            Press Room
          </a>
        </div>
        <p class="text-sm">© 2023 MovieBox by ANT-MAN</p>
      </div>
    </div>
  );
};

export default Footer;
