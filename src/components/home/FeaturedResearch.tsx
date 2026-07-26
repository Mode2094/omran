"use client";

import { motion } from "framer-motion";
import { FiArrowLeft, FiFileText, FiCalendar, FiTag } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FeaturedResearch() {
  const [researches, setResearches] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/research")
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : [];
        setResearches(items.filter((r: any) => r.featured).slice(0, 3));
      })
      .catch(() => {});
  }, []);
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(13,148,136,0.03),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-6 border border-primary-100"
          >
            <FiFileText className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">أبحاث ومقالات</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            أحدث الأبحاث
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            أبحاث ومقالات في علوم القرآن الكريم والتدبر القرآني من مدرسة العمران
          </motion.p>
        </div>

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researches.map((research, index) => (
            <motion.div
              key={research.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 h-full border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary-100 rounded-full">
                      <FiTag className="w-3 h-3 text-primary-600" />
                      <span className="text-xs font-medium text-primary-700">{research.category}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <FiCalendar className="w-3 h-3" />
                      <span className="text-xs">{research.publish_date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {research.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-line">
                    {research.summary}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-primary-600 group-hover:gap-3 transition-all cursor-pointer">
                    <span className="text-sm font-medium">اقرأ البحث</span>
                    <FiArrowLeft className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/research">
            <button className="px-8 py-4 bg-gradient-to-l from-primary-500 to-primary-600 text-white font-bold rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5 flex items-center gap-3 mx-auto">
              <span>عرض جميع الأبحاث</span>
              <FiArrowLeft className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
