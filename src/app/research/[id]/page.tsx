"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiTag, FiDownload, FiLoader } from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ResearchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!params.id) return;

    Promise.all([
      fetch(`/api/research/${params.id}`).then((r) => r.ok ? r.json() : null),
      fetch(`/api/articles/${params.id}`).then((r) => r.ok ? r.json() : null),
    ]).then(([research, article]) => {
      if (research && research.id) {
        setItem({ ...research, _type: "research" });
      } else if (article && article.id) {
        setItem({ ...article, _type: "article" });
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }).catch(() => {
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

  if (notFound || !item) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 font-arabic flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">المحتوى غير موجود</h2>
            <Link href="/research">
              <Button variant="primary">العودة للدروس والأبحاث</Button>
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
        <section className={`text-white py-16 ${item._type === "research" ? "bg-gradient-to-br from-accent-500 to-accent-700" : "bg-gradient-to-br from-gold-500 to-gold-700"}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <button onClick={() => router.back()} className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
                <FiArrowRight className="w-5 h-5" />
                <span>العودة</span>
              </button>

              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {item.category && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-sm">
                    <FiTag className="w-3 h-3" />
                    {item.category}
                  </span>
                )}
                {item.publish_date && (
                  <span className="inline-flex items-center gap-1 text-white/70 text-sm">
                    <FiCalendar className="w-3 h-3" />
                    {item.publish_date}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold leading-tight">{item.title}</h1>

              {item.summary && (
                <p className="text-white/80 mt-4 text-lg">{item.summary}</p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100"
          >
            {item.cover_image && (
              <div className="mb-8 rounded-2xl overflow-hidden">
                <img src={item.cover_image} alt={item.title} className="w-full h-auto object-cover" />
              </div>
            )}

            <div className="prose prose-lg max-w-none prose-arabic text-gray-700 leading-loose whitespace-pre-line text-right">
              {item.content}
            </div>

            {item.pdf_file && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <a href={item.pdf_file} download>
                  <Button variant="accent">
                    <FiDownload className="w-4 h-4 ml-2" />
                    تحميل PDF
                  </Button>
                </a>
              </div>
            )}
          </motion.div>

          <div className="text-center mt-8">
            <Link href="/contact">
              <button className="px-8 py-4 bg-gradient-to-l from-accent-500 to-accent-600 text-white font-bold rounded-2xl hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg shadow-accent-500/30 hover:shadow-xl hover:-translate-y-0.5">
                للطلب والاستفسار
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
