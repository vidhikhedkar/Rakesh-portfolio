import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaGlobe, FaLinkedinIn, FaBehance } from "react-icons/fa6";
import approach from '../../assets/approach.png';
import { CiMobile2, CiPen } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { SlLayers } from "react-icons/sl";
import { LiaBookSolid } from "react-icons/lia";
import { getHomeContentService } from "../service/hometab.service";

const Home = () => {
  const [homeContent, setHomeContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const response = await getHomeContentService();

        console.log("Home API Data:", response);

        if (response.success) {
          setHomeContent(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch home content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);


  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const serviceIcons = [
    <LiaBookSolid />,
    <CiMobile2 />,
    <SlLayers />,
    <CiPen />,
    <GoPeople />,
  ];

  return (
    <main className="bg-[#f4f6fa] py-10">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">

          {/* Profile Section -> Links to About/Profile */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="group relative min-h-70 overflow-hidden rounded-[28px] bg-white p-4 shadow-[0_15px_50px_rgba(35,45,80,0.04)] sm:p-6 sm:pl-10 lg:col-span-6"
          >
            <NavLink to="/about" className="absolute inset-0 z-0" aria-label="Go to Profile" />

            {/* Background Glow */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-50 -top-20 h-48 w-48 rounded-full bg-[#5b78ff]/10 blur-3xl pointer-events-none"
            />

            <div className="relative flex h-full flex-col justify-center sm:gap-10 gap-5 sm:flex-row sm:items-center sm:justify-start">
              {/* Profile Image */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.25,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.03,
                }}
                className="relative mx-auto h-50 w-50 shrink-0 overflow-hidden rounded-tl-[30px] rounded-br-[30px] bg-[#6d88ff] sm:mx-0 z-10"
              >
                <img
                  src={homeContent?.imageUrl}
                  alt={`${homeContent?.firstName} ${homeContent?.lastName}`}
                  className="h-full w-full object-contain grayscale transition duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Profile Content */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.7,
                }}
                className="text-center sm:text-left relative z-10"
              >
                <p className="mb-1 text-[13px] font-medium uppercase tracking-wide text-[#BCBCBC]">
                  {homeContent?.role}
                </p>

                <h1 className="text-5xl font-medium leading-[0.95] tracking-[-1.5px] text-[#0F0F0F] sm:text-5xl">
                  {homeContent?.firstName}
                  <br />
                  {homeContent?.lastName}
                </h1>

                <p className="mt-4 max-w-52.5 text-[15px] leading-5 text-[#949597]">
                  {homeContent?.location}
                </p>
              </motion.div>
            </div>

            <PlusButton to="/about" />
          </motion.section>


          <div className="grid grid-cols-1 gap-5 lg:col-span-6">
            <motion.div
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="flex h-10 w-full items-center overflow-hidden rounded-full bg-white px-5 shadow-[0_10px_35px_rgba(30,40,80,0.03)] sm:px-6"
            >
              <motion.div
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                className="flex min-w-max items-center gap-4 whitespace-nowrap text-[9px] font-medium uppercase tracking-wide text-[#b8bbc4] px-10"
              >
                <div className="flex shrink-0 items-center gap-4 pr-4">
                  <TickerItem text={homeContent?.tickerText} />
                  <TickerDot />
                  <TickerItem text={homeContent?.tickerText} />
                  <TickerDot />
                  <TickerItem text={homeContent?.tickerText} />
                  <TickerDot />
                  <TickerItem text={homeContent?.tickerText} />
                  <TickerDot />
                  <TickerItem text={homeContent?.tickerText} />
                  <TickerDot />
                </div>

                <div className="flex shrink-0 items-center gap-4 pr-4">
                  <TickerItem text={homeContent?.tickerText} />
                  <TickerDot />
                  <TickerItem text={homeContent?.tickerText} />
                  <TickerDot />
                  <TickerItem text={homeContent?.tickerText} />
                  <TickerDot />
                  <TickerItem text={homeContent?.tickerText} />
                  <TickerDot />
                  <TickerItem text={homeContent?.tickerText} />
                  <TickerDot />
                </div>
              </motion.div>
            </motion.div>


            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Signature / Credentials -> Links to About */}
              <motion.section
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{
                  delay: 0.1,
                }}
                whileHover={{
                  y: -4,
                }}
                className="group relative flex min-h-46.25 flex-col justify-between overflow-hidden rounded-[28px] bg-white p-5 shadow-[0_15px_50px_rgba(35,45,80,0.04)]"
              >
                <NavLink to="/profile" className="absolute inset-0 z-0" aria-label="Go to Credentials" />

                <div className="flex flex-1 items-center justify-center">
                  <motion.div
                    animate={{
                      rotate: [0, 3, -3, 0],
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="select-none font-[cursive] text-4xl font-light text-[#d7d8dc] sm:text-5xl"
                  >
                    Signature
                  </motion.div>
                </div>

                <div className="relative z-10">
                  <p className="text-[13px] uppercase text-[#BCBCBC]">
                    More About Me
                  </p>

                  <h2 className="mt-1 text-[15px] font-medium text-[#0F0F0F]">
                    My Profile
                  </h2>
                </div>

                <PlusButton to="/profile" />
              </motion.section>


              {/* Projects Showcase -> Links to Works */}
              <motion.section
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{
                  delay: 0.15,
                }}
                whileHover={{
                  y: -4,
                }}
                className="group relative flex min-h-46.25 flex-col justify-between overflow-hidden rounded-[28px] bg-white p-5 shadow-[0_15px_50px_rgba(35,45,80,0.04)]"
              >
                <NavLink to="/projects" className="absolute inset-0 z-0" aria-label="Go to Projects" />

                <div className="flex flex-1 items-center justify-center">
                  <motion.div
                    whileHover={{
                      y: -8,
                      rotate: -2,
                      scale: 1.04,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                    }}
                    className="relative z-10"
                  >
                    <div className="w-27.5 rounded-t-sm border border-[#cfd2d9] bg-white p-1.25 shadow-lg sm:w-30">
                      <div className="h-16.25 rounded-xs bg-[#f4f5f8] p-2">
                        <div className="mb-2 h-1.5 w-12 rounded-full bg-[#d5d9e5]" />
                        <div className="grid grid-cols-3 gap-1">
                          <div className="h-7 rounded bg-[#e4e7f1]" />
                          <div className="col-span-2 h-7 rounded bg-[#e8ebff]" />
                          <div className="col-span-2 h-1.5 rounded bg-[#d7dbe7]" />
                          <div className="h-1.5 rounded bg-[#cdd4ff]" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute -bottom-1 -left-2 h-1.25 w-31.5 rounded-b-full bg-[#c7cad1] sm:w-34" />
                  </motion.div>
                </div>

                <div className="relative z-10">
                  <p className="text-[11px] uppercase text-[#BCBCBC]">
                    Showcase
                  </p>

                  <h2 className="mt-1 text-[15px] font-medium text-[#0F0F0F]">
                    Projects
                  </h2>
                </div>

                <PlusButton to="/projects" />
              </motion.section>
            </div>
          </div>


          {/* Approach Card -> Links to Works/About */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{
              delay: 0.2,
            }}
            whileHover={{
              y: -4,
            }}
            className="group relative flex min-h-46.25 flex-col justify-between overflow-hidden rounded-[28px] bg-white p-5 shadow-[0_15px_50px_rgba(35,45,80,0.04)] lg:col-span-3"
          >
            <NavLink to="/projects" className="absolute inset-0 z-0" aria-label="Go to Approach" />

            <div className="flex flex-1 items-center justify-center">
              <motion.div
                whileHover={{
                  scale: 1.08,
                }}
                transition={{
                  type: "spring",
                }}
                className="tracking-[-11px] select-none relative z-10"
              >
                <img
                  src={approach}
                  alt="approach"
                  className="h-full w-full object-contain transition duration-700 group-hover:scale-105"
                />
              </motion.div>
            </div>

            <div className="relative z-10">
              <p className="text-[11px] uppercase text-[#BCBCBC]">
                Simple & Useful
              </p>

              <h2 className="mt-1 text-[15px] font-medium text-[#0F0F0F]">
                My Approach
              </h2>
            </div>

            <PlusButton to="/projects" />
          </motion.section>


          {/* Services Offering -> Links to Works */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.25 }}
            whileHover={{ y: -4 }}
            className="group relative flex min-h-72.5 flex-col overflow-hidden rounded-[28px] bg-white p-7 shadow-[0_15px_50px_rgba(35,45,80,0.04)] lg:col-span-6"
          >
            <NavLink to="/services-offering" className="absolute inset-0 z-0" aria-label="Go to Services" />

            {/* Service Icons */}
            <div className="flex flex-1 items-start justify-between px-6 pt-16 sm:px-10 relative z-10">
              {homeContent?.services?.map((service, index) => (
                <motion.div
                  key={service.title + index}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.4 + index * 0.1,
                  }}
                  whileHover={{
                    y: -7,
                    scale: 1.08,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex cursor-pointer items-center justify-center relative"
                  aria-label={service.title}
                >
                  <div className="flex h-12 w-12 items-center justify-center text-[32px] text-[#4A6AF4]">
                    {serviceIcons[index]}
                  </div>

                  {/* Tooltip for Service Name on Hover */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: -8, scale: 1 }}
                        exit={{ opacity: 0, y: 2, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#111111] px-3 py-1.5 text-[11px] font-medium text-white shadow-lg z-30 pointer-events-none"
                      >
                        {service.title}
                        {/* Tooltip Arrow */}
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-[#111111]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Bottom Content */}
            <div className="relative z-10">
              <p className="text-[11px] font-normal uppercase tracking-wide text-[#BCBCBC]">
                WHAT I DO
              </p>

              <h2 className="mt-2 text-[25px] font-medium leading-none tracking-[-0.5px] text-[#0F0F0F]">
                Services Offering
              </h2>
            </div>

            <PlusButton to="/services-offering" />
          </motion.section>


          {/* Stay With Me / Connect -> Links to Contact */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="group relative flex min-h-75 flex-col overflow-hidden rounded-[28px] bg-white p-5 shadow-[0_15px_50px_rgba(35,45,80,0.04)] lg:col-span-3"
          >
            <NavLink to="/contact" className="absolute inset-0 z-0" aria-label="Go to Contact" />

            {/* Social Icons Continuous Scroll Container */}
            <div
              className="flex h-29 w-full items-center rounded-4xl bg-[#f7f8fa] relative z-10 overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                animate={{
                  x: isHovered ? ["0%", "0%"] : ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    duration: isHovered ? 0 : 3,
                    repeat: isHovered ? 0 : Infinity,
                    ease: "linear",
                  }
                }}
                className="flex w-max items-center gap-4 px-4"
              >
                {/* First Set of Icons */}
                <div className="flex items-center gap-4 shrink-0">
                  <motion.a
                    href="https://yourwebsite.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-15 w-15 items-center justify-center rounded-full bg-white text-[#5878ff] transition-all duration-300 hover:bg-[#f3f5ff] shadow-sm relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGlobe className="text-[23px]" />
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-15 w-15 items-center justify-center rounded-full bg-white text-[#5878ff] transition-all duration-300 hover:bg-[#f3f5ff] shadow-sm relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaLinkedinIn className="text-[22px]" />
                  </motion.a>

                  <motion.a
                    href="https://behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-15 w-15 items-center justify-center rounded-full bg-white text-[#5878ff] transition-all duration-300 hover:bg-[#f3f5ff] shadow-sm relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaBehance className="text-[23px]" />
                  </motion.a>
                </div>

                {/* Duplicated Set for Seamless Infinite Loop */}
                <div className="flex items-center gap-4 shrink-0">
                  <motion.a
                    href="https://yourwebsite.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-15 w-15 items-center justify-center rounded-full bg-white text-[#5878ff] transition-all duration-300 hover:bg-[#f3f5ff] shadow-sm relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGlobe className="text-[23px]" />
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-15 w-15 items-center justify-center rounded-full bg-white text-[#5878ff] transition-all duration-300 hover:bg-[#f3f5ff] shadow-sm relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaLinkedinIn className="text-[22px]" />
                  </motion.a>

                  <motion.a
                    href="https://behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-15 w-15 items-center justify-center rounded-full bg-white text-[#5878ff] transition-all duration-300 hover:bg-[#f3f5ff] shadow-sm relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaBehance className="text-[23px]" />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Bottom Content */}
            <div className="mt-auto pb-1 relative z-10">
              {homeContent?.ctaHeading}
            </div>

            <PlusButton to="/contact" />
          </motion.section>

          {/* Stats Section */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{
              delay: 0.35,
            }}
            className="rounded-[28px] bg-white p-5 shadow-[0_15px_50px_rgba(35,45,80,0.04)] sm:p-6 lg:col-span-6"
          >
            <div className="grid grid-cols-3 gap-3">
              <Stat
                number={homeContent?.experienceYears}
                label="Years Experience"
              />

              <Stat
                number={homeContent?.clientsCount}
                label="Clients Worldwide"
              />

              <Stat
                number={homeContent?.totalProjectsCount}
                label="Total Projects"
              />
            </div>
          </motion.section>


          {/* Call to Action Card -> Links to Contact */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{
              delay: 0.4,
            }}
            whileHover={{
              y: -4,
            }}
            className="group relative flex min-h-42.5 items-center overflow-hidden rounded-[28px] bg-white p-6 shadow-[0_15px_50px_rgba(35,45,80,0.04)] sm:p-8 lg:col-span-6"
          >
            <NavLink to="/contact" className="absolute inset-0 z-0" aria-label="Go to Contact Page" />

            <div className="absolute left-8 top-0 h-13.75 w-0.5 bg-[#d9deea] pointer-events-none" />

            <div className="absolute left-4.5 top-10 h-8 w-8 pointer-events-none">
              <svg
                viewBox="0 0 32 32"
                className="h-full w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 0
         C16.8 8.5 23.5 15.2 32 16
         C23.5 16.8 16.8 23.5 16 32
         C15.2 23.5 8.5 16.8 0 16
         C8.5 15.2 15.2 8.5 16 0Z"
                  fill="white"
                  stroke="#cfd5e2"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                x: -15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.6,
              }}
              className="relative z-10"
            >
              <p className="text-3xl font-medium leading-[1.15] tracking-[-1px] text-[#151619] sm:text-[38px] pt-16">
                Let's
                <br />
                work{" "}
                <span className="text-[#5b78ff] transition-colors">
                  together.
                </span>
              </p>
            </motion.div>

            <PlusButton to="/contact" />
          </motion.section>
        </div>
      </div>
    </main>
  );
};


const TickerItem = ({ text }) => {
  return (
    <span>
      {text?.split(" ")[0]}{" "}
      <b className="text-[#5b78ff]">
        {text?.split(" ").slice(1).join(" ")}
      </b>
    </span>
  );
};


const TickerDot = () => {
  return (
    <span className="text-[#d5d7dc]">
      •
    </span>
  );
};


const PlusButton = ({ to = "/contact" }) => {
  return (
    <NavLink
      to={to}
      className="absolute bottom-5 right-5 h-10 w-10 cursor-pointer z-20 block"
      aria-label="Navigate"
    >
      <motion.div
        initial={{ opacity: 0.9 }}
        whileHover={{ scale: 1.05 }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className="h-full w-full"
      >
        <svg
          viewBox="0 0 56 56"
          className="h-full w-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="28"
            cy="28"
            r="26"
            stroke="#EEF1F7"
            strokeWidth="2"
            className="transition-all duration-500 ease-out group-hover:stroke-[#DCE2EF]"
          />

          <line
            x1="0"
            y1="28"
            x2="28"
            y2="28"
            stroke="#E3E8FA"
            strokeWidth="2"
            className="transition-all duration-500 ease-out group-hover:stroke-[#5B78FF]"
          />

          <path
            d="M28 17
            C28.7 23.5 32.5 27.3 39 28
            C32.5 28.7 28.7 32.5 28 39
            C27.3 32.5 23.5 28.7 17 28
            C23.5 27.3 27.3 23.5 28 17
            Z"
            fill="#E0E6FA"
            className="transition-all duration-500 ease-out group-hover:fill-[#5B78FF]"
          />
        </svg>
      </motion.div>
    </NavLink>
  );
};


const Stat = ({ number, label }) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      className="flex min-h-33.75 flex-col items-center justify-center rounded-[25px] bg-[#F7F9FC] px-2 text-center"
    >
      <div
        className="text-[27px] font-medium tracking-[-1px] text-[#5B78F6]"
      >
        {number}
      </div>

      <div
        className="mt-3 max-w-20 text-[11px] uppercase leading-4 text-[#BCBCBC]">
        {label}
      </div>
    </motion.div>
  );
};

export default Home;