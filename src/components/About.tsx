import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin, School } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "FAST National University of Computer and Emerging Sciences, Lahore",
      year: "2021 - 2025",
      location: "Lahore, Pakistan"
     
    },
    {
      degree: "Intermediate in Pre Engineering",
      institution: "Goverment College University",
      year: "2019 - 2021",
      location: "Lahore, Pakistan"
     
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          {/* About Me Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              About Me
            </h2>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Image Column - Takes 4 columns on large screens */}
              <div className="lg:col-span-4">
    <div className="relative w-48 h-48 mx-auto">
      <img
        src="/images/Usman.jpg"
        alt="Profile"
        className="rounded-full shadow-xl object-cover w-full h-full border-4 border-purple-500 dark:border-purple-400"
        style={{ imageRendering: "auto", maxWidth: "100%", height: "auto" }}
      />
      <div className="absolute inset-0 rounded-full bg-purple-500 dark:bg-purple-400 opacity-10 transform hover:scale-105 transition-transform duration-300"></div>
    </div>
  </div>
              
              {/* Content Column - Takes 8 columns on large screens */}
              <div className="lg:col-span-8 text-left space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    Hello! I'm a passionate Full Stack Developer with a strong foundation in modern web technologies. 
                    I love creating elegant solutions to complex problems and am dedicated to writing clean, efficient code.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    With experience in both front-end and back-end development, I enjoy building full-stack applications 
                    that are not only functional but also provide an excellent user experience. I'm constantly learning 
                    and staying up-to-date with the latest technologies and best practices in web development.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl text-center mb-12">
              Education
            </h2>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-8">
                      <div className="flex items-center space-x-3 mb-2">
                        <GraduationCap className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {edu.degree}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-3 mb-2">
                        <School className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <p className="text-gray-600 dark:text-gray-300">
                          {edu.institution}
                        </p>
                      </div>
                     
                    </div>
                    <div className="md:col-span-4 flex flex-col justify-start space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{edu.year}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{edu.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;