import React from "react";
import TitleText from "components/common/TitleText";
import { Link } from "react-router-dom";
import SoundWaves from "components/common/SoundWaves";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white shadow lg:h-64 h-80">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center mb-4">
              <Link to="/#">
                <TitleText text="Amplify" type="primary" as="h1" />
              </Link>
              <SoundWaves />
            </div>
            <div className="flex items-center justify-evenly w-full">
              <Link to="/#">
                <Instagram />
              </Link>
              <Link to="/#">
                <Facebook />
              </Link>
              <Link to="/#">
                <Twitter />
              </Link>
            </div>
          </div>
          <ul
            className="flex flex-wrap items-center justify-center mb-6 text-sm 
          font-medium text-white sm:mb-0 sm:mt-0 mt-4"
          >
            <li>
              <Link to="/#" className="hover:underline me-4 md:me-6">
                About Us & Contact
              </Link>
            </li>
            <li>
              <Link to="/#" className="hover:underline me-4 md:me-6">
                Help & FAQs
              </Link>
            </li>
            <li>
              <Link to="/#" className="hover:underline me-4 md:me-6">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-center mt-4">
          <p className="mr-4">¡Siguenos en GitHub, como Amplify!</p>
          <a href="https://github.com/No-Country/s15-05-amplify-app">
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 
                0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 
                0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 
                0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 
                0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 
                4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 
                0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 
                1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
