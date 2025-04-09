import Header from "../components/AboutPageComponents/Header";
import banner from "../assets/banner3.jpg"
import person1 from "../assets/images/person1.png";
import person2 from "../assets/images/person2.png";
import person3 from "../assets/images/person3.png";

import { motion } from "framer-motion";


const teamMembers = [
  {
    name: "Md Habib Ullah",
    role: "Full Stack Developer",
    image: person1
  },
  {
    name: "Mehedi Hasan",
    role: "Full Stack Developer",
    image: person2
  },
  {
    name: "Rakibul Hasan",
    role: "Full Stack Developer",
    image: person3
  },
  {
    name: "Tahmidul Islam Tausif",
    role: "Full Stack Developer",
    image: person3
  },
  {
    name: "Muvin Mohammad",
    role: "Full Stack Developer",
    image: person3
  },
  {
    name: "Rajoan Bosunia",
    role: "Full Stack Developer",
    image: person3
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
          className="text-3xl md:text-5xl font-bold "
        >
          Welcome to Bike Museum Family
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-lg md:text-xl "
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
          className="text-3xl font-semibold text-center mb-10 "
        >
          Meet Our Team
        </motion.h2>

        <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, idx) => (
           <div key={idx}>
             <motion.div
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
                className="w-24 md:w-28 lg:w-36 h-24 md:h-28 lg:h-36 rounded-full mx-auto object-top border-2 border-white mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm ">{member.role}</p>
            </motion.div>
           </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 w-full ">
        <motion.h2
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-center mb-10 "
        >
          Contact Us
        </motion.h2>

        <form className="max-w-3xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded border-1 border-blue-400 w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded border-1 border-blue-400 w-full "
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows={5}
            className="p-3 rounded border-1 border-blue-400 w-full"
          ></textarea>
          <button
            type="submit"
            className="myBtn"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
