"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FiYoutube, FiFacebook, FiArrowDown, FiBookOpen } from "react-icons/fi";
import Link from "next/link";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full py-20">
          {/* Content */}
          <div className="text-right">
            {/* Bismillah */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-gold-400/80 text-lg md:text-xl mb-8 font-arabic"
            >
              بسم الله الرحمن الرحيم
            </motion.p>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
                مدرسة
              </span>
              <span className="block text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-l from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent leading-tight">
                العمران
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-white/60 max-w-lg mb-10 leading-relaxed"
            >
              تقدم دروساً شاملة في تدبر القرآن الكريم وعلومه وبيانه، وفق المنهج التاريخي الذي نزلت عليه سور القرآن الكريم، لمساعدة المسلمين على فهم كتابهم الكريم والتفكر في آياته العظيمة
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link href="/books">
                <button className="px-8 py-4 bg-gradient-to-l from-gold-500 to-gold-600 text-white font-bold rounded-2xl hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-lg shadow-gold-500/30 hover:shadow-xl hover:shadow-gold-500/40 hover:-translate-y-0.5 flex items-center gap-3">
                  <FiBookOpen className="w-5 h-5" />
                  إصدارات المدرسة
                </button>
              </Link>
              <Link href="/research">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5">
                  الدروس والأبحاث
                </button>
              </Link>
            </motion.div>

            {/* Social + Author */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://www.youtube.com/channel/UCrLF7D4Blxxlj4tbJeABaSA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white/70 hover:bg-red-500 hover:text-white transition-all duration-300 border border-white/10"
              >
                <FiYoutube className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100063448434448"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white/70 hover:bg-blue-500 hover:text-white transition-all duration-300 border border-white/10"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <div className="w-px h-8 bg-white/20 mx-2" />
              <span className="text-white/50 text-sm">عمران سميح نزال — مدرسة العمران</span>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400/30 to-accent-400/30 rounded-3xl blur-3xl scale-110" />

              {/* Image Container */}
              <div className="relative w-80 h-96 md:w-96 md:h-[28rem] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <img
                  src="/uploads/profile.png"
                  alt="عمران سميح نزال - مدرسة العمران"
                  className="w-full h-full object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -bottom-6 -right-6 md:-right-10 bg-white rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                    <FiBookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">+١٠</p>
                    <p className="text-xs text-gray-500">كتب صادرة</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute -top-4 -left-4 md:-left-8 bg-gradient-to-br from-gold-500 to-gold-600 text-white rounded-2xl px-4 py-3 shadow-xl"
              >
                <p className="font-bold text-sm">مدرّسة في التدبر القرآني</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-sm">اكتشف المزيد</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FiArrowDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
