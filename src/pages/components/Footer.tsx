const Footer = () => {
  return (
    <footer className="bg-black text-white text-sm px-6 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>&copy; 2025 Bike Museum. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
