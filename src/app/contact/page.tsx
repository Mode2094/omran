"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiSend, FiYoutube, FiFacebook, FiCheck } from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 font-arabic">
        <section className="bg-gradient-to-br from-gold-500 to-gold-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <FiMail className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">تواصل معي</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                يسعدني تلقي استفساراتكم وأسئلتكم في تدبر القرآن الكريم وعلومه
              </p>
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FiCheck className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">تم إرسال رسالتك بنجاح!</h3>
                    <p className="text-gray-500">سأرد عليك في أقرب وقت ممكن إن شاء الله</p>
                    <Button variant="primary" className="mt-8" onClick={() => setSent(false)}>
                      إرسال رسالة أخرى
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">أرسل رسالة</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="الاسم الكامل"
                        placeholder="أدخل اسمك"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                      <Input
                        label="البريد الإلكتروني"
                        type="email"
                        placeholder="example@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                    <Input
                      label="الموضوع"
                      placeholder="موضوع الرسالة (مثال: سؤال في تفسير آية)"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                    <Textarea
                      label="الرسالة"
                      placeholder="اكتب سؤالك أو استفسارك هنا..."
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                    <Button type="submit" variant="primary" size="lg" disabled={loading}>
                      {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
                      {!loading && <FiSend className="w-5 h-5 mr-2" />}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-gray-900 mb-6">قنوات التواصل</h3>
                <div className="space-y-4">
                  <a
                    href="https://www.youtube.com/channel/UCrLF7D4Blxxlj4tbJeABaSA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                      <FiYoutube className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">يوتيوب</p>
                      <p className="text-sm text-gray-500">شاهد الدروس القرآنية</p>
                    </div>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=100063448434448"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <FiFacebook className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">فيسبوك</p>
                      <p className="text-sm text-gray-500">تابع الدروس والمواد العلمية</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-4 rounded-xl">
                    <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center">
                      <FiMail className="w-6 h-6 text-accent-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">البريد الإلكتروني</p>
                      <p className="text-sm text-gray-500">contact@omran-nazal.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl p-8 text-white">
                <h3 className="font-bold text-lg mb-4">ملاحظة هامة</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  أسعى للرد على جميع الاستفسارات العلمية في أقرب وقت ممكن. يُفضل ذكر الأدلة الشرعية عند طرح الأسئلة لتسهيل المراجعة والبحث.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
