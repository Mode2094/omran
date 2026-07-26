"use client";

import { motion } from "framer-motion";
import { FiYoutube, FiFacebook, FiMessageCircle, FiArrowLeft, FiSend } from "react-icons/fi";

export default function SocialLinks() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-right"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/10">
              <FiMessageCircle className="w-4 h-4 text-gold-400" />
              <span className="text-sm font-medium text-white/90">تواصل معي</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              تابعني على
              <br />
              <span className="bg-gradient-to-l from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
                منصات التواصل الاجتماعي
              </span>
            </h2>

            <p className="text-lg text-white/60 mb-10 leading-relaxed">
              يمكنكم متابعتي على منصات التواصل الاجتماعي للحصول على آخر الدروس والمحتوى القرآني المتجدد
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.youtube.com/channel/UCrLF7D4Blxxlj4tbJeABaSA"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-4 bg-red-500/20 backdrop-blur-sm rounded-2xl border border-red-500/30 hover:bg-red-500 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiYoutube className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">يوتيوب</p>
                  <p className="text-sm text-white/60">اشترك في القناة</p>
                </div>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=100063448434448"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-4 bg-blue-500/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 hover:bg-blue-500 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiFacebook className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">فيسبوك</p>
                  <p className="text-sm text-white/60">تابع الصفحة</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 text-right">أرسل رسالة</h3>

              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="الاسم الكامل"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="الرسالة..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-gold-400 transition-colors resize-none"
                  />
                </div>
                <button
                  type="button"
                  className="w-full py-4 bg-gradient-to-l from-gold-500 to-gold-600 text-white font-bold rounded-xl hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-lg shadow-gold-500/30 flex items-center justify-center gap-2"
                >
                  <FiSend className="w-4 h-4" />
                  إرسال الرسالة
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
