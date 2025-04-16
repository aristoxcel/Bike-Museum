

interface HeaderProps {
  image: string;
  text: string;
}

const Header: React.FC<HeaderProps> = ({ image, text }) => {
  return (
    <div>
      <div
        className="h-56 lg:h-[400px] flex items-center justify-center w-full bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <h1 className="lg:text-7xl text-3xl md:text-4xl font-bold text-white">
          {text}
        </h1>
      </div>
    </div>
  );
};

export default Header;
