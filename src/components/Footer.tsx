import logo from '../assets/logs.png'
import { FaSquareFacebook, FaTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";

function Footer() {
  return (
    <div className=" text-gray-300">
      <div className="container mx-auto">
        <footer className="md:flex  gap-6 p-10  items-end  justify-evenly">
          <aside className="max-w-52 ">
            <a href={"/"}>
              <img src={logo} alt="logo" height={90} width={150}/>
            </a>
            <h4 className=" text-lg text-orange-200 font-bold">
             Bike Museum Co. Ltd.
              <br />
              <p className="font-roboto text-base font-medium text-gray-300">Your trusted destination for premium bikes & accessories.</p>
            </h4>

            <ul className="flex gap-5 mt-4">
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

          <nav className="flex flex-col gap-2">
            <h6 className="text-lg font-bold text-orange-500 max-w-44 pt-10">Company</h6>
            <a className="link link-hover">About Us</a>
            <a className="link link-hover">All Products</a>
            <a className="link link-hover">Contact Us</a>
          </nav>

          <nav className="flex flex-col gap-2">
            <h6 className="text-lg font-bold text-orange-500 max-w-44 pt-10">Services</h6>
            <a className="link link-hover">Parts</a>
            <a className="link link-hover">Cleaning</a>
            <a className="link link-hover">Servicing</a>
          
          </nav>

          <nav className="flex flex-col gap-2">
            <h6 className="text-lg font-bold text-orange-500 max-w-44 pt-10 ">Newsletter</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
          
        </footer>
        


        <aside className="py-12 text-center">
          <h4 className="px-3">
            Copyright &copy; 2025 All Rights Reserved | This Website is made
            with by <span className="text-orange-500">Bike Museum</span>
          </h4>
        </aside>
      </div>
    </div>
  );
}

export default Footer;
