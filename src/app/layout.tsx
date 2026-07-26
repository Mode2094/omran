import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  title: {
    default: "مدرسة العمران في تدبر القرآن",
    template: "%s | مدرسة العمران في تدبر القرآن",
  },
  description:
    "مدرسة العمران في تدبر القرآن الكريم - دروس شاملة في تدبر القرآن الكريم وعلومه وبيانه وفق المنهج التاريخي الذي نزلت عليه سور القرآن الكريم.",
  keywords: [
    "مدرسة العمران",
    "تدبر القرآن",
    "علوم القرآن",
    "بيان القرآن",
    "تفسير القرآن",
    "دروس قرآنية",
    "أبحاث قرآنية",
    "قرآن كريم",
    "منهج تاريخي",
    "القرآن الكريم",
    "عمران سميح نزال",
  ],
  authors: [{ name: "عمران سميح نزال" }],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "مدرسة العمران في تدبر القرآن",
    title: "مدرسة العمران في تدبر القرآن",
    description:
      "مدرسة العمران في تدبر القرآن الكريم - دروس شاملة في تدبر القرآن الكريم وعلومه وبيانه وفق المنهج التاريخي الذي نزلت عليه سور القرآن الكريم.",
  },
  twitter: {
    card: "summary_large_image",
    title: "مدرسة العمران في تدبر القرآن",
    description:
      "مدرسة العمران في تدبر القرآن الكريم - دروس شاملة في تدبر القرآن الكريم وعلومه وبيانه.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-arabic antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
