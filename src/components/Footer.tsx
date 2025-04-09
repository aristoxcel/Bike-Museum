
import logo from "../../public/vite.svg";
import { FaSquareFacebook, FaTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";

function Footer() {
  return (
    <div className="bg-accent text-gray-300">
      <div className="container mx-auto">
        <footer className="footer p-10 ">
          <aside className="max-w-52 ">
            <a href={"/"}>
              <img src={logo} alt="logo" height={70} width={70}/>
            </a>
            <h4 className="font-playFair text-lg text-secondary">
              Mohsin Law & Tax House
              <br />
              <p className="font-roboto text-base text-gray-300">Providing reliable solution of any act since 2000</p>
            </h4>

            <ul className="flex gap-5">
              <a>
                <FaSquareFacebook className="text-4xl text-sky-800 border-2 rounded-full hover:bg-secondary hover:text-5xl hover:m-0 hover:mr-1 m-2 p-2" />
              </a>
              <a>
                <FaTwitter className="text-4xl text-sky-400 border-2 rounded-full hover:bg-secondary hover:text-5xl hover:m-0 hover:mr-1 m-2 p-2" />
              </a>
              <a>
                <IoLogoYoutube className="text-4xl text-red-500 border-2 rounded-full hover:bg-secondary hover:text-5xl hover:m-0 hover:mr-1 m-2 p-2" />
              </a>
            </ul>
          </aside>

          <nav>
            <h6 className="text-lg font-semibold text-secondary max-w-44 pt-10">Company</h6>
            <a className="link link-hover">About Us</a>
            <a className="link link-hover">All Products</a>
            <a className="link link-hover">Contact Us</a>
          </nav>
          <nav>
            <h6 className="text-lg font-semibold text-secondary max-w-44 pt-10">Services</h6>
            <a className="link link-hover">Parts</a>
            <a className="link link-hover">Cleaning</a>
            <a className="link link-hover">Servicing</a>
          
          </nav>
          <nav>
            <h6 className="text-lg font-semibold text-secondary max-w-44 pt-10 ">Newsletter</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
        <aside className="py-12 text-center">
          <h4 className="px-3">
            Copyright &copy; 2025 All Rights Reserved | This Website is made
            with by <span className="text-primary">Group 4</span>
          </h4>
        </aside>
      </div>
    </div>
  );
}

export default Footer;
