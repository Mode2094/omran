"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiTag, FiUser, FiLoader } from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!params.id) return;

    fetch(`/api/books/${params.id}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 font-arabic flex items-center justify-center">
          <FiLoader className="w-8 h-8 text-primary-500 animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !book) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 font-arabic flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">الكتاب غير موجود</h2>
            <Link href="/books">
              <Button variant="primary">العودة للكتب</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 font-arabic">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <button onClick={() => router.back()} className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
                <FiArrowRight className="w-5 h-5" />
                <span>العودة</span>
              </button>

              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {book.category && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-sm">
                    <FiTag className="w-3 h-3" />
                    {book.category}
                  </span>
                )}
                {book.publish_date && (
                  <span className="inline-flex items-center gap-1 text-white/70 text-sm">
                    <FiCalendar className="w-3 h-3" />
                    {book.publish_date}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold leading-tight">{book.title}</h1>

              {book.author && (
                <p className="text-white/70 mt-3 flex items-center gap-2">
                  <FiUser className="w-4 h-4" />
                  {book.author}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cover */}
            {book.cover_image && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:col-span-1"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 sticky top-28">
                  <img src={book.cover_image} alt={book.title} className="w-full h-auto object-cover" />
                </div>
              </motion.div>
            )}

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={book.cover_image ? "md:col-span-2" : "md:col-span-3"}
            >
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">عن الكتاب</h2>
                <div className="prose prose-lg max-w-none prose-arabic text-gray-700 leading-loose whitespace-pre-line text-right">
                  {book.description}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Link href="/contact">
                    <Button variant="primary" className="w-full">
                      للطلب والاستفسار
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
