import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const { title, description, author, coverImage, pdfFile, category, publishDate, purchaseLink, featured } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "العنوان والوصف مطلوبان" },
        { status: 400 }
      );
    }

    const book = await prisma.book.create({
      data: {
        title,
        description,
        author: author || "عمران سميح نزال",
        coverImage: coverImage || null,
        pdfFile: pdfFile || null,
        category: category || null,
        publishDate: publishDate || null,
        purchaseLink: purchaseLink || null,
        featured: featured || false,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
