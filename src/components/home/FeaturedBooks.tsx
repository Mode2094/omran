"use client";

import { motion } from "framer-motion";
import { FiArrowLeft, FiBook } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FeaturedBooks() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : [];
        setBooks(items.filter((b: any) => b.featured).slice(0, 6));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-50 rounded-full mb-6 border border-accent-100"
          >
            <FiBook className="w-4 h-4 text-accent-600" />
            <span className="text-sm font-medium text-accent-700">إصدارات المدرسة</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            أحدث الإصدارات
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            مجموعة من الكتب والمخطوطات في علوم القرآن الكريم والتدبر القرآني الصادرة عن مدرسة العمران
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book: any, index: number) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-accent-200 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={book.cover_image || "/uploads/books/book-01.png"}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                    <span className="text-xs font-medium text-gray-700">{book.category}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="font-bold text-gray-900">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 whitespace-pre-line line-clamp-3">
                    {book.description}
                  </p>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 transition-colors">
                    <span className="text-sm font-medium">للطلب والاستفسار</span>
                    <FiArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/books">
            <button className="px-8 py-4 bg-gradient-to-l from-accent-500 to-accent-600 text-white font-bold rounded-2xl hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40 hover:-translate-y-0.5 flex items-center gap-3 mx-auto">
              <span>عرض جميع الإصدارات</span>
              <FiArrowLeft className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
