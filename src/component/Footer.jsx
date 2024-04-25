import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="text-white bg-black ">
      <div className="text-center ">
        <div className="flex items-center justify-center gap-5 pt-4">
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
        <div className="flex items-center justify-center gap-5 py-5">
          <a className="text-[12px] sm:text-base" href="">
            Conditions of Use
          </a>
          <a className="text-[12px] sm:text-base" href="">
            Privacy &amp; Policy
          </a>
          <a className="text-[12px] sm:text-base" href="">
            Press Room
          </a>
        </div>
        <p className="text-sm">© 2023 MovieBox by ANT-MAN</p>
      </div>
    </div>
  );
};

export default Footer;
