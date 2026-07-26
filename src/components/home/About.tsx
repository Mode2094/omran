"use client";

import { motion } from "framer-motion";
import { FiBookOpen, FiUsers, FiGlobe, FiAward } from "react-icons/fi";

const stats = [
  { icon: FiBookOpen, value: "+١٢", label: "كتاب منشور" },
  { icon: FiUsers, value: "+١٠٠٠", label: "طالب ومتابع" },
  { icon: FiGlobe, value: "+٥٠", label: "دولة عربية" },
  { icon: FiAward, value: "+١٥", label: "سنة خبرة" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(13,148,136,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(26,54,93,0.05),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-right"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-50 rounded-full mb-6 border border-accent-100">
              <div className="w-2 h-2 bg-accent-500 rounded-full" />
              <span className="text-sm font-medium text-accent-700">تعرف عليّ</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              عمران سميح نزال
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                أقدم دروساً شاملة في تدبر القرآن الكريم وعلومه وبيانه، بهدف مساعدة المسلمين على فهم كتابهم الكريم والتفكر في آياته العظيمة. رحلتي بدأت من الشغف العميق بكتاب الله تعالى، وتعمّقت في مختلف العلوم القرآنية.
              </p>
              <p>
                أسعى دائماً لتقديم محتوى قرآني أصيل يجمع بين العلم الشرعي والتطبيق العملي، بحيث يكون التدبر سهلاً وممتعاً لكل مسلم في أي مكان في العالم.
              </p>
              <p>
                من خلال قناتي على يوتيوب وموقعي الإلكتروني، أقدم دروساً يومية وأسبوعية في التفسير والتدبر والعلوم القرآنية المختلفة.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-100">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-5 h-5 text-accent-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
