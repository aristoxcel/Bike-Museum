const Testimonials = () => {
    return (
      <div className="bg-gray-100 text-black py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2">
          <div className="bg-white p-6 rounded shadow">
            <p>"Amazing service and collection of bikes!"</p>
            <p className="mt-2 font-semibold">- Rahim</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p>"Quick delivery and good support. Highly recommended."</p>
            <p className="mt-2 font-semibold">- Ayesha</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Testimonials;
  