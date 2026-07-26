export interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  coverImage?: string | null;
  pdfFile?: string | null;
  category?: string | null;
  publishDate?: string | null;
  purchaseLink?: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Research {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverImage?: string | null;
  pdfFile?: string | null;
  category?: string | null;
  references?: string | null;
  publishDate?: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Article {
  id: string;
  title: string;
  summary?: string | null;
  content: string;
  coverImage?: string | null;
  category?: string | null;
  publishDate?: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface SiteContent {
  id: string;
  key: string;
  value: string;
  updatedAt: Date;
}

export interface User {
  id: string;
  username: string;
  password: string;
  role: string;
  createdAt: Date;
}
