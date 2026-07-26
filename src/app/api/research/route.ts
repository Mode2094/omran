import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: researches, error } = await supabase
      .from("research")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json(researches);
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, summary, content, coverImage, pdfFile, category, publishDate, featured } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "عنوان ومحتوى البحث مطلوبان" }, { status: 400 });
    }

    const { data: research, error } = await supabase
      .from("research")
      .insert([{
        title,
        summary: summary || "",
        content,
        cover_image: coverImage || null,
        pdf_file: pdfFile || null,
        category: category || null,
        publish_date: publishDate || null,
        featured: featured || false,
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(research, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
