import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: articles, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, summary, content, coverImage, category, publishDate, featured } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "عنوان ومحتوى المقال مطلوبان" }, { status: 400 });
    }

    const { data: article, error } = await supabase
      .from("articles")
      .insert([{
        title,
        summary: summary || "",
        content,
        cover_image: coverImage || null,
        category: category || null,
        publish_date: publishDate || null,
        featured: featured || false,
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
