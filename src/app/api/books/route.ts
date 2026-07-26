import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: books, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, author, coverImage, pdfFile, category, publishDate, purchaseLink, featured } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "العنوان والوصف مطلوبان" }, { status: 400 });
    }

    const { data: book, error } = await supabase
      .from("books")
      .insert([{
        title,
        description,
        author: author || "عمران سميح نزال",
        cover_image: coverImage || null,
        pdf_file: pdfFile || null,
        category: category || null,
        publish_date: publishDate || null,
        purchase_link: purchaseLink || null,
        featured: featured || false,
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
