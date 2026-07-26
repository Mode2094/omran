"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiFileText, FiSearch } from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import Link from "next/link";

export default function ResearchPage() {
  const [items, setItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"research" | "articles">("research");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const endpoint = activeTab === "research" ? "/api/research" : "/api/articles";
    setLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeTab]);

  const filtered = items.filter(
    (item) =>
      item.title.includes(searchTerm) ||
      (item.summary && item.summary.includes(searchTerm)) ||
      item.content.includes(searchTerm)
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 font-arabic">
        <section className="bg-gradient-to-br from-accent-500 to-accent-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <FiFileText className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">الدروس والأبحاث القرآنية</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                استكشف الدروس والأبحاث المتخصصة من مدرسة العمران في تدبر القرآن الكريم وعلومه وبيانه
              </p>
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
            <div className="flex bg-white rounded-xl border border-gray-200 p-1">
              <button
                onClick={() => setActiveTab("research")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "research" ? "bg-accent-500 text-white" : "text-gray-600"
                }`}
              >
                الأبحاث المتخصصة
              </button>
              <button
                onClick={() => setActiveTab("articles")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "articles" ? "bg-accent-500 text-white" : "text-gray-600"
                }`}
              >
                المقالات والدروس
              </button>
            </div>
            <div className="relative w-full sm:w-80">
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث في الدروس والأبحاث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none transition-all font-arabic"
              />
            </div>
          </div>

          {loading ? (
            <Loading />
          ) : filtered.length > 0 ? (
            <div className="space-y-6">
              {filtered.map((item: any, index: number) => (
                <Link key={item.id} href={`/research/${item.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card padding="lg" className="hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex flex-col md:flex-row gap-6">
                        {item.cover_image && (
                          <div className="md:w-48 h-48 bg-gradient-to-br from-accent-100 to-primary-100 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={item.cover_image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            {item.category && (
                              <span className="text-xs px-3 py-1 bg-accent-50 text-accent-600 rounded-full">{item.category}</span>
                            )}
                            {item.publish_date && (
                              <span className="text-xs text-gray-400">{item.publish_date}</span>
                            )}
                          </div>
                          <h3 className="font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                          {item.summary && <p className="text-gray-500 mb-3 line-clamp-2">{item.summary}</p>}
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4 whitespace-pre-line">{item.content}</p>
                          <span className="text-accent-600 text-sm font-medium">اقرأ المزيد ←</span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FiFileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">لا يوجد محتوى بعد</h3>
              <p className="text-gray-500">سيتم إضافة الدروس والأبحاث القرآنية قريباً من خلال لوحة التحكم</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
