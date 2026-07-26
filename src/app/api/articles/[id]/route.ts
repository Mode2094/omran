import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: article, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", params.id)
      .single();
    if (error) throw error;
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: "المقال غير موجود" }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { title, summary, content, coverImage, category, publishDate, featured } = body;

    const { data: article, error } = await supabase
      .from("articles")
      .update({
        title,
        summary,
        content,
        cover_image: coverImage || null,
        category: category || null,
        publish_date: publishDate || null,
        featured: featured || false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", params.id);
    if (error) throw error;
    return NextResponse.json({ message: "تم الحذف" });
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
