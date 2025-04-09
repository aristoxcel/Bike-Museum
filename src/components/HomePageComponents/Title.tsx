// function Title({ text, subtitle }) {
//   return (
//     <div className="flex flex-col justify-center items-center text-center w-full space-y-10">
//       <h1 className="text-orange-500 font-playFair font-bold text-2xl md:text-3xl lg:text-5xl">
//         {text}
//       </h1>
//       {subtitle && (
//         <p className="text-gray-600 text-sm md:text-base lg:text-lg">
//           {subtitle}
//         </p>
//       )}
//       <div className="  bg-primary lg:w-44 md:w-36">
//         <div className="red_stick bg-secondary h-1.5 w-2 -p-1 m-0"></div>
//       </div>
//     </div>
//   );
// }

// export default Title;

interface TitleProps {
  text: string;      // 'text' is required and should be a string
  subtitle?: string; // 'subtitle' is optional and should be a string
}

const Title: React.FC<TitleProps> = ({ text, subtitle }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center w-full space-y-10">
      <h1 className="text-orange-500 font-playFair font-bold text-2xl md:text-3xl lg:text-5xl">
        {text}
      </h1>
      {subtitle && (
        <p className="text-gray-600 text-sm md:text-base lg:text-lg">
          {subtitle}
        </p>
      )}
      <div className="bg-primary lg:w-44 md:w-36">
        <div className="red_stick bg-secondary h-1.5 w-2 -p-1 m-0"></div>
      </div>
    </div>
  );
}

export default Title;