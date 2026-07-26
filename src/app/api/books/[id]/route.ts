import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: book, error } = await supabase
      .from("books")
      .select("*")
      .eq("id", params.id)
      .single();
    if (error) throw error;
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: "الكتاب غير موجود" }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { title, description, author, coverImage, pdfFile, category, publishDate, purchaseLink, featured } = body;

    const { data: book, error } = await supabase
      .from("books")
      .update({
        title,
        description,
        author: author || "عمران سميح نزال",
        cover_image: coverImage || null,
        pdf_file: pdfFile || null,
        category: category || null,
        publish_date: publishDate || null,
        purchase_link: purchaseLink || null,
        featured: featured || false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", params.id);
    if (error) throw error;
    return NextResponse.json({ message: "تم الحذف" });
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
