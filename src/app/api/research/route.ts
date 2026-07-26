import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    const research = await prisma.research.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(research);
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const { title, summary, content, coverImage, pdfFile, category, references: refs, publishDate, featured } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "العنوان والمحتوى مطلوبان" },
        { status: 400 }
      );
    }

    const research = await prisma.research.create({
      data: {
        title,
        summary: summary || "",
        content,
        coverImage: coverImage || null,
        pdfFile: pdfFile || null,
        category: category || null,
        references: refs || null,
        publishDate: publishDate || null,
        featured: featured || false,
      },
    });

    return NextResponse.json(research, { status: 201 });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
