"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiEdit3, FiTrash2, FiBook, FiImage } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import Loading from "@/components/ui/Loading";

export default function AdminBooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [form, setForm] = useState({
    title: "", description: "", author: "عمران سميح نزال", category: "", publishDate: "", purchaseLink: "", coverImage: "", featured: false,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchBooks = () => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => { setBooks(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchBooks(); }, []);

  const openModal = (book?: any) => {
    if (book) {
      setEditingBook(book);
      setForm({ title: book.title, description: book.description, author: book.author || "عمران سميح نزال", category: book.category || "", publishDate: book.publish_date || "", purchaseLink: book.purchase_link || "", coverImage: book.cover_image || "", featured: book.featured });
      setImagePreview(book.cover_image || "");
    } else {
      setEditingBook(null);
      setForm({ title: "", description: "", author: "عمران سميح نزال", category: "", publishDate: "", purchaseLink: "", coverImage: "", featured: false });
      setImagePreview("");
    }
    setModalOpen(true);
  };

  const handleSave = async () => {
    const url = editingBook ? `/api/books/${editingBook.id}` : "/api/books";
    const method = editingBook ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setModalOpen(false);
    fetchBooks();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الكتاب؟")) return;
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    fetchBooks();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setForm({ ...form, coverImage: data.url });
        setImagePreview(data.url);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlInput = (url: string) => {
    setForm({ ...form, coverImage: url });
    setImagePreview(url);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">إدارة الكتب</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">إضافة وتعديل وحذف الكتب</p>
        </div>
        <Button onClick={() => openModal()} className="self-start sm:self-auto">
          <FiPlus className="w-5 h-5 ml-2" />
          إضافة كتاب
        </Button>
      </div>

      {loading ? <Loading /> : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {books.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {books.map((book: any) => (
                <div key={book.id} className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-16 sm:w-16 sm:h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {book.cover_image ? <img src={book.cover_image} alt="" className="w-full h-full object-cover rounded-lg" /> : <FiBook className="w-5 h-5 sm:w-6 sm:h-6 text-primary-300" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate text-sm sm:text-base">{book.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 truncate hidden sm:block">{book.description}</p>
                    <div className="flex gap-2 mt-1">
                      {book.category && <span className="text-xs px-2 py-0.5 bg-primary-50 text-primary-500 rounded">{book.category}</span>}
                      {book.featured && <span className="text-xs px-2 py-0.5 bg-gold-50 text-gold-600 rounded">مميز</span>}
                    </div>
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <button onClick={() => openModal(book)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-primary-500"><FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                    <button onClick={() => handleDelete(book.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500"><FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <FiBook className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm sm:text-base">لا توجد كتب بعد. اضغط "إضافة كتاب" للبدء</p>
            </div>
          )}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingBook ? "تعديل الكتاب" : "إضافة كتاب جديد"} size="lg">
        <div className="space-y-4">
          <Input label="عنوان الكتاب" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="أدخل عنوان الكتاب" />
          <Textarea label="الوصف" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="أدخل وصف الكتاب" rows={4} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="التصنيف" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="مثال: أدب، علمي" />
            <Input label="تاريخ النشر" value={form.publishDate} onChange={(e) => setForm({ ...form, publishDate: e.target.value })} placeholder="2024" />
          </div>
          <Input label="رابط الشراء" value={form.purchaseLink} onChange={(e) => setForm({ ...form, purchaseLink: e.target.value })} placeholder="رابط اختياري" />

          {/* Cover Image Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">صورة الغلاف</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="الصق رابط الصورة هنا..."
                  value={form.coverImage}
                  onChange={(e) => handleUrlInput(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1">أو ارفع صورة من جهازك</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={uploading}
                  className="mt-2 w-full text-sm text-gray-500 file:ml-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary-50 file:text-primary-600"
                />
                {uploading && <p className="text-xs text-primary-500 mt-1">جاري الرفع...</p>}
              </div>
              {imagePreview && (
                <div className="w-24 h-32 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                  <img src={imagePreview} alt="معاينة" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-primary-500" />
            <label htmlFor="featured" className="text-sm text-gray-700">كتاب مميز</label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>إلغاء</Button>
            <Button onClick={handleSave}>{editingBook ? "تحديث" : "إضافة"}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
