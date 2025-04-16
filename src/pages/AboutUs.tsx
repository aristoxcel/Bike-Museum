import Header from "../components/AboutPageComponents/Header";
import banner from "../assets/banner3.jpg"
import person1 from "../assets/images/person1.png";
import person2 from "../assets/images/person2.png";
import person3 from "../assets/images/person3.png";
import person4 from "../assets/images/person4.png";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Rakibul Hasan",
    role: "Founder, Bike Museum",
    image: person1
  },
  {
    name: "Samiul Islam",
    role: "CEO, Bike Museum",
    image: person2
  },
  {
    name: "Rasel Ahmed",
    role: "Marketing Manager",
    image: person3
  },
  {
    name: "Jannatul Ferdous",
    role: "Customer Support",
    image: person4
  },
];

export default function Home() {
  return (
    <div>
        <section className=""><Header image={banner} text={"About Us"} ></Header></section>
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-orange-400"
        >
          Welcome to Bike Museum Family
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-lg md:text-xl text-gray-200"
        >
          Your trusted destination for premium bikes & accessories.
        </motion.p>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10 text-orange-400"
        >
          Meet Our Team
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-white/10 rounded-xl p-6 shadow-lg text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 md:w-28 lg:w-36 h-24 md:h-28 lg:h-36  mx-auto object-top  mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-300">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 w-full bg-gradient-to-t from-gray-800 to-gray-900">
        <motion.h2
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10 text-orange-400"
        >
          Contact Us
        </motion.h2>

        <form className="max-w-3xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded bg-gray-700 text-white w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded bg-gray-700 text-white w-full "
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows={5}
            className="p-3 rounded bg-gray-700 text-white w-full"
          ></textarea>
          <button
            type="submit"
            className="mt-2 px-3 py-1 border-4 text-lg border-orange-400 bg-orange-400  text-white hover:bg-transparent hover:text-orange-400 font-bold transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
