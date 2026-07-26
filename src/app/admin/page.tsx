"use client";

import { useEffect, useState } from "react";
import { FiBook, FiFileText, FiEdit3, FiMessageSquare } from "react-icons/fi";
import StatsCard from "@/components/admin/StatsCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ books: 0, research: 0, articles: 0, messages: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/books").then((r) => r.json()),
      fetch("/api/research").then((r) => r.json()),
      fetch("/api/articles").then((r) => r.json()),
      fetch("/api/messages").then((r) => r.json()),
    ]).then(([books, research, articles, messages]) => {
      setStats({
        books: Array.isArray(books) ? books.length : 0,
        research: Array.isArray(research) ? research.length : 0,
        articles: Array.isArray(articles) ? articles.length : 0,
        messages: Array.isArray(messages) ? messages.length : 0,
      });
    }).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
      <p className="text-gray-500 mb-8">مرحباً بك في لوحة إدارة الموقع</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard title="الكتب" value={stats.books} icon={<FiBook className="w-6 h-6" />} color="primary" />
        <StatsCard title="الأبحاث" value={stats.research} icon={<FiFileText className="w-6 h-6" />} color="accent" />
        <StatsCard title="المقالات" value={stats.articles} icon={<FiEdit3 className="w-6 h-6" />} color="gold" />
        <StatsCard title="الرسائل" value={stats.messages} icon={<FiMessageSquare className="w-6 h-6" />} color="red" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">مرحباً بك</h2>
        <p className="text-gray-500 leading-relaxed">
          من هنا يمكنك إدارة محتوى الموقع بالكامل. يمكنك إضافة وتعديل وحذف الكتب والأبحاث والمقالات، بالإضافة إلى إدارة رسائل التواصل الواردة.
        </p>
      </div>
    </div>
  );
}
