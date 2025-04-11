

interface ClientCardProps {
  img: string;
  comment: string;
  name: string;
}

const Client_Card: React.FC<ClientCardProps> = ({ img, comment, name }) => {
  return (
    <div className="mt-20 mb-8">
      <div className="relative mx-auto bg-orange-50 shadow-sm shadow-primary rounded-lg max-w-sm border-2 border-primary">
        {/* Profile Image */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 rounded-full z-50 overflow-hidden shadow-lg w-32 h-32">
          <img
            className="object-cover z-40 w-full h-full"
            src={img}
            alt="Profile Image"
          />
        </div>
        {/* Card Content */}
        <div className="pt-24 pb-8">
          <p className="font-roboto text-accent max-w-md text-center mx-auto px-4">
            {comment}
          </p>
          <h2 className="text-xl font-semibold text-gray-600 font-playFair text-center pt-6">
            {name}
          </h2>
          <p className="font-roboto text-center text-accent">Client</p>
        </div>
      </div>
    </div>
  );
};

export default Client_Card;
