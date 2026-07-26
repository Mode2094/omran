"use client";

import Link from "next/link";
import { FiYoutube, FiFacebook, FiMail, FiArrowUp } from "react-icons/fi";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary-500 text-white font-arabic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="شعار عمران سميح نزال" className="w-12 h-12 rounded-xl object-contain bg-white/10 p-1" />
              <div>
                <h3 className="font-bold text-lg">عمران سميح نزال</h3>
                <p className="text-white/60 text-sm">دروس في تدبر القرآن الكريم وعلومه وبيانه</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              أسعى من خلال أعمالي إلى تعليم المسلمين كتابهم الكريم والعودة بالتفكر في آياته كما كان يفعل السلف الصالح.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">روابط سريعة</h4>
            <div className="space-y-3">
              <Link href="/" className="block text-white/70 hover:text-white transition-colors">
                الرئيسية
              </Link>
              <Link href="/books" className="block text-white/70 hover:text-white transition-colors">
                الكتب
              </Link>
              <Link href="/research" className="block text-white/70 hover:text-white transition-colors">
                الدروس والأبحاث
              </Link>
              <Link href="/contact" className="block text-white/70 hover:text-white transition-colors">
                تواصل معي
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">تواصل معي</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.youtube.com/channel/UCrLF7D4Blxxlj4tbJeABaSA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-red-500 transition-all duration-300"
              >
                <FiYoutube className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100063448434448"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all duration-300"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@omran-nazal.com"
                className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-accent-500 transition-all duration-300"
              >
                <FiMail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-white/60 text-sm">
              البريد الإلكتروني: contact@omran-nazal.com
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} عمران سميح نزال. جميع الحقوق محفوظة.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <FiArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
