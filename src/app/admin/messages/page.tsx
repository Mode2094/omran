"use client";

import { useEffect, useState } from "react";
import { FiMail, FiTrash2, FiEye, FiCheck } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Loading from "@/components/ui/Loading";
import { formatDate } from "@/lib/utils";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  const fetchMessages = () => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => { setMessages(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return;
    await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
    fetchMessages();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">الرسائل الواردة</h1>
        <p className="text-gray-500 mt-1">إدارة رسائل التواصل الواردة من الزوار</p>
      </div>

      {loading ? <Loading /> : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {messages.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {messages.map((msg: any) => (
                <div key={msg.id} className="flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{msg.name}</h3>
                      {!msg.read && <span className="w-2 h-2 bg-red-500 rounded-full" />}
                    </div>
                    <p className="text-sm text-gray-500">{msg.email}</p>
                    <p className="text-sm text-gray-400 truncate mt-1">{msg.message}</p>
                  </div>
                  <span className="text-xs text-gray-400 hidden sm:block">{formatDate(msg.createdAt)}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setSelected(msg)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-primary-500"><FiEye className="w-5 h-5" /></button>
                    <button onClick={() => handleDelete(msg.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500"><FiTrash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FiMail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد رسائل بعد</p>
            </div>
          )}
        </div>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="تفاصيل الرسالة">
        {selected && (
          <div className="space-y-4 font-arabic">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <span className="font-bold text-primary-500">{selected.name[0]}</span>
              </div>
              <div>
                <p className="font-bold text-gray-900">{selected.name}</p>
                <p className="text-sm text-gray-500">{selected.email}</p>
              </div>
            </div>
            {selected.subject && <p className="text-sm text-gray-500"><strong>الموضوع:</strong> {selected.subject}</p>}
            <p className="text-gray-700 leading-relaxed">{selected.message}</p>
            <p className="text-xs text-gray-400">{formatDate(selected.createdAt)}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
