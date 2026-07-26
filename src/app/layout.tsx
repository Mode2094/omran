import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  title: {
    default: "عمران سميح نزال | دروس في تدبر القرآن الكريم وعلومه وبيانه",
    template: "%s | عمران سميح نزال",
  },
  description:
    "الموقع الشخصي لعمران سميح نزال - دروس في تدبر القرآن الكريم وعلومه وبيانه. دروس قرآنية، أبحاث متخصصة، كتب في علوم القرآن.",
  keywords: [
    "عمران سميح نزال",
    "تدبر القرآن",
    "علوم القرآن",
    "بيان القرآن",
    "تفسير القرآن",
    "دروس قرآنية",
    "أبحاث قرآنية",
    "قرآن كريم",
    "تلاوة",
    "تجويد",
    "قراءات",
  ],
  authors: [{ name: "عمران سميح نزال" }],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "عمران سميح نزال",
    title: "عمران سميح نزال | دروس في تدبر القرآن الكريم وعلومه وبيانه",
    description:
      "الموقع الشخصي لعمران سميح نزال - دروس في تدبر القرآن الكريم وعلومه وبيانه. دروس قرآنية، أبحاث متخصصة، كتب في علوم القرآن.",
  },
  twitter: {
    card: "summary_large_image",
    title: "عمران سميح نزال | دروس في تدبر القرآن الكريم وعلومه وبيانه",
    description:
      "الموقع الشخصي لعمران سميح نزال - دروس في تدبر القرآن الكريم وعلومه وبيانه",
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
