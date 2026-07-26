"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiEdit3, FiTrash2, FiEdit3 as FiArticle } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import Loading from "@/components/ui/Loading";

export default function AdminArticlesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({
    title: "", summary: "", content: "", category: "", publishDate: "", featured: false,
  });

  const fetchItems = () => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => { setItems(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const openModal = (item?: any) => {
    if (item) {
      setEditing(item);
      setForm({ title: item.title, summary: item.summary || "", content: item.content, category: item.category || "", publishDate: item.publish_date || "", featured: item.featured });
    } else {
      setEditing(null);
      setForm({ title: "", summary: "", content: "", category: "", publishDate: "", featured: false });
    }
    setModalOpen(true);
  };

  const handleSave = async () => {
    const url = editing ? `/api/articles/${editing.id}` : "/api/articles";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setModalOpen(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    await fetch(`/api/articles/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) setForm({ ...form, [field]: data.url });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">إدارة المقالات</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">إضافة وتعديل وحذف المقالات</p>
        </div>
        <Button onClick={() => openModal()} className="self-start sm:self-auto">
          <FiPlus className="w-5 h-5 ml-2" />
          إضافة مقال
        </Button>
      </div>

      {loading ? <Loading /> : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {items.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiEdit3 className="w-5 h-5 sm:w-6 sm:h-6 text-gold-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate text-sm sm:text-base">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 truncate hidden sm:block">{item.summary || item.content.slice(0, 80)}</p>
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <button onClick={() => openModal(item)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-primary-500"><FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500"><FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <FiEdit3 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm sm:text-base">لا توجد مقالات بعد</p>
            </div>
          )}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "تعديل المقال" : "إضافة مقال جديد"} size="lg">
        <div className="space-y-4">
          <Input label="عنوان المقال" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input label="ملخص قصير" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
          <Textarea label="المحتوى" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="التصنيف" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Input label="تاريخ النشر" value={form.publishDate} onChange={(e) => setForm({ ...form, publishDate: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">صورة الغلاف</label>
            <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "coverImage")} className="w-full text-sm text-gray-500 file:ml-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gold-50 file:text-gold-600" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded border-gray-300" />
            <label htmlFor="featured" className="text-sm text-gray-700">مقال مميز</label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>إلغاء</Button>
            <Button onClick={handleSave}>{editing ? "تحديث" : "إضافة"}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
