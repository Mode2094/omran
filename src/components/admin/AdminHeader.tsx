"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiLayout, FiBook, FiFileText, FiEdit3, FiMessageSquare, FiLogOut, FiMenu, FiX } from "react-icons/fi";

const adminLinks = [
  { href: "/admin", label: "لوحة التحكم", icon: FiLayout },
  { href: "/admin/books", label: "إدارة الكتب", icon: FiBook },
  { href: "/admin/research", label: "إدارة الأبحاث", icon: FiFileText },
  { href: "/admin/articles", label: "إدارة المقالات", icon: FiEdit3 },
  { href: "/admin/messages", label: "الرسائل", icon: FiMessageSquare },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <>
      <aside className="hidden lg:flex flex-col w-72 bg-white border-l border-gray-200 min-h-screen font-arabic">
        <div className="p-6 border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-3">
            <img src="/logo.png" alt="شعار عمران سميح نزال" className="w-10 h-10 rounded-xl object-contain" />
            <div>
              <h1 className="font-bold text-gray-900">لوحة التحكم</h1>
              <p className="text-xs text-gray-500">إدارة الموقع</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary-500"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            العودة للموقع
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full"
          >
            <FiLogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between font-arabic">
        <h1 className="font-bold">لوحة التحكم</h1>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-gray-100">
          {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)}>
          <div className="w-72 bg-white h-full mr-auto p-4 space-y-2 font-arabic" onClick={(e) => e.stopPropagation()}>
            {adminLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full"
            >
              <FiLogOut className="w-5 h-5" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      )}
    </>
  );
}
