"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiBook, FiDownload, FiExternalLink, FiSearch } from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["all", ...Array.from(new Set(books.map((b: any) => b.category).filter(Boolean)))];
  const filteredBooks = books.filter(
    (book) =>
      (selectedCategory === "all" || book.category === selectedCategory) &&
      (book.title.includes(searchTerm) || book.description.includes(searchTerm))
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 font-arabic">
        <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <FiBook className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">الكتب</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                اكتشف الإصدارات من مدرسة العمران في تدبر القرآن الكريم وعلومه وبيانه
              </p>
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن كتاب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all font-arabic"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-primary-500 text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300"
                  }`}
                >
                  {cat === "all" ? "الكل" : cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <Loading />
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book: any, index: number) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col">
                    <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl mb-4 overflow-hidden">
                      {book.cover_image ? (
                        <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <FiBook className="w-16 h-16 text-primary-300 mx-auto mb-2" />
                            <p className="text-primary-400 font-medium">{book.title}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {book.category && (
                          <span className="text-xs px-3 py-1 bg-primary-50 text-primary-500 rounded-full">{book.category}</span>
                        )}
                        {book.publish_date && (
                          <span className="text-xs text-gray-400">{book.publish_date}</span>
                        )}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{book.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                      <p className="text-sm text-gray-500 line-clamp-3 whitespace-pre-line">{book.description}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {book.pdf_file && (
                        <a href={book.pdf_file} download className="flex-1">
                          <Button variant="accent" size="sm" className="w-full">
                            <FiDownload className="w-4 h-4 ml-2" />
                            تحميل PDF
                          </Button>
                        </a>
                      )}
                      {book.purchase_link && (
                        <a href={book.purchase_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button variant="primary" size="sm" className="w-full">
                            <FiExternalLink className="w-4 h-4 ml-2" />
                            اقتناء
                          </Button>
                        </a>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FiBook className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد كتب بعد</h3>
              <p className="text-gray-500">سيتم إضافة الكتب قريباً من خلال لوحة التحكم</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
