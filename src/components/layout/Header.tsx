"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiBook, FiMail, FiHome, FiFileText, FiSearch } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "الرئيسية", icon: FiHome },
  { href: "/books", label: "الكتب", icon: FiBook },
  { href: "/research", label: "الدروس والأبحاث", icon: FiFileText },
  { href: "/contact", label: "تواصل معنا", icon: FiMail },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<{ books: any[]; research: any[]; articles: any[] }>({ books: [], research: [], articles: [] });
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setResults({ books: [], research: [], articles: [] });
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      Promise.all([
        fetch("/api/books").then((r) => r.json()).catch(() => []),
        fetch("/api/research").then((r) => r.json()).catch(() => []),
        fetch("/api/articles").then((r) => r.json()).catch(() => []),
      ]).then(([books, research, articles]) => {
        const q = searchTerm.toLowerCase();
        const filterItems = (items: any[]) =>
          Array.isArray(items)
            ? items.filter(
                (item: any) =>
                  item.title?.toLowerCase().includes(q) ||
                  item.description?.toLowerCase().includes(q) ||
                  item.summary?.toLowerCase().includes(q) ||
                  item.content?.toLowerCase().includes(q)
              )
            : [];

        setResults({
          books: filterItems(books).slice(0, 3),
          research: filterItems(research).slice(0, 3),
          articles: filterItems(articles).slice(0, 3),
        });
        setShowDropdown(true);
        setLoading(false);
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleSelect = (type: string, id: string) => {
    setShowDropdown(false);
    setSearchTerm("");
    setSearchOpen(false);
    if (type === "book") {
      router.push("/books");
    } else {
      router.push(`/research/${id}`);
    }
  };

  const hasResults = results.books.length > 0 || results.research.length > 0 || results.articles.length > 0;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 font-arabic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <img src="/logo.png" alt="مدرسة العمران" className="w-10 h-10 rounded-xl object-contain" />
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-gray-900">مدرسة العمران</h1>
              <p className="text-xs text-gray-500">في تدبر القرآن الكريم</p>
            </div>
          </Link>

          {/* Desktop Search */}
          <div ref={searchRef} className="hidden md:block relative flex-1 max-w-md mx-6">
            <AnimatePresence>
              {searchOpen ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative"
                >
                  <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ابحث في الكتب والأبحاث والمقالات..."
                    className="w-full pr-11 pl-10 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:bg-white transition-all font-arabic"
                    onBlur={() => { if (!searchTerm) setSearchOpen(false); }}
                  />
                  <button
                    onClick={() => { setSearchOpen(false); setSearchTerm(""); setShowDropdown(false); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-4 h-4" />
                  </button>

                  {/* Dropdown */}
                  {showDropdown && searchTerm.trim().length >= 2 && (
                    <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-96 overflow-y-auto z-50">
                      {loading ? (
                        <div className="p-4 text-center text-gray-400 text-sm">جاري البحث...</div>
                      ) : hasResults ? (
                        <div className="py-2">
                          {results.books.length > 0 && (
                            <div>
                              <div className="px-4 py-2 text-xs font-bold text-primary-500 bg-primary-50/50">الكتب</div>
                              {results.books.map((book: any) => (
                                <button
                                  key={book.id}
                                  onClick={() => handleSelect("book", book.id)}
                                  className="w-full text-right px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                >
                                  <FiBook className="w-4 h-4 text-primary-400 shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{book.title}</p>
                                    <p className="text-xs text-gray-400 truncate">{book.description}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                          {results.research.length > 0 && (
                            <div>
                              <div className="px-4 py-2 text-xs font-bold text-accent-500 bg-accent-50/50">الأبحاث</div>
                              {results.research.map((item: any) => (
                                <button
                                  key={item.id}
                                  onClick={() => handleSelect("research", item.id)}
                                  className="w-full text-right px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                >
                                  <FiFileText className="w-4 h-4 text-accent-400 shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                    <p className="text-xs text-gray-400 truncate">{item.summary}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                          {results.articles.length > 0 && (
                            <div>
                              <div className="px-4 py-2 text-xs font-bold text-gold-500 bg-gold-50/50">المقالات</div>
                              {results.articles.map((item: any) => (
                                <button
                                  key={item.id}
                                  onClick={() => handleSelect("article", item.id)}
                                  className="w-full text-right px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                >
                                  <FiFileText className="w-4 h-4 text-gold-400 shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                    <p className="text-xs text-gray-400 truncate">{item.summary}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-400 text-sm">لا توجد نتائج لـ &quot;{searchTerm}&quot;</div>
                      )}
                    </div>
                  )}
                </motion.div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-400 hover:bg-gray-200 transition-colors w-full"
                >
                  <FiSearch className="w-4 h-4" />
                  <span>بحث...</span>
                </button>
              )}
            </AnimatePresence>
          </div>

          <nav className="hidden lg:flex items-center gap-1 shrink-0">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                      : "text-gray-600 hover:text-primary-500 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              <div ref={searchRef} className="relative">
                <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث في الكتب والأبحاث والمقالات..."
                  className="w-full pr-11 pl-10 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:bg-white transition-all font-arabic"
                />
                {searchTerm && (
                  <button
                    onClick={() => { setSearchTerm(""); setShowDropdown(false); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}

                {/* Mobile Dropdown */}
                {showDropdown && searchTerm.trim().length >= 2 && (
                  <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-80 overflow-y-auto z-50">
                    {loading ? (
                      <div className="p-4 text-center text-gray-400 text-sm">جاري البحث...</div>
                    ) : hasResults ? (
                      <div className="py-2">
                        {results.books.length > 0 && (
                          <div>
                            <div className="px-4 py-2 text-xs font-bold text-primary-500 bg-primary-50/50">الكتب</div>
                            {results.books.map((book: any) => (
                              <button
                                key={book.id}
                                onClick={() => handleSelect("book", book.id)}
                                className="w-full text-right px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3"
                              >
                                <FiBook className="w-4 h-4 text-primary-400 shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{book.title}</p>
                                  <p className="text-xs text-gray-400 truncate">{book.description}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                        {results.research.length > 0 && (
                          <div>
                            <div className="px-4 py-2 text-xs font-bold text-accent-500 bg-accent-50/50">الأبحاث</div>
                            {results.research.map((item: any) => (
                              <button
                                key={item.id}
                                onClick={() => handleSelect("research", item.id)}
                                className="w-full text-right px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3"
                              >
                                <FiFileText className="w-4 h-4 text-accent-400 shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                  <p className="text-xs text-gray-400 truncate">{item.summary}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                        {results.articles.length > 0 && (
                          <div>
                            <div className="px-4 py-2 text-xs font-bold text-gold-500 bg-gold-50/50">المقالات</div>
                            {results.articles.map((item: any) => (
                              <button
                                key={item.id}
                                onClick={() => handleSelect("article", item.id)}
                                className="w-full text-right px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3"
                              >
                                <FiFileText className="w-4 h-4 text-gold-400 shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                  <p className="text-xs text-gray-400 truncate">{item.summary}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-400 text-sm">لا توجد نتائج لـ &quot;{searchTerm}&quot;</div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary-500 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
