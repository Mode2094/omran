import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: research, error } = await supabase
      .from("research")
      .select("*")
      .eq("id", params.id)
      .single();
    if (error) throw error;
    return NextResponse.json(research);
  } catch (error) {
    return NextResponse.json({ error: "البحث غير موجود" }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { title, summary, content, coverImage, pdfFile, category, references, publishDate, featured } = body;

    const { data: research, error } = await supabase
      .from("research")
      .update({
        title,
        summary,
        content,
        cover_image: coverImage || null,
        pdf_file: pdfFile || null,
        category: category || null,
        references: references || null,
        publish_date: publishDate || null,
        featured: featured || false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(research);
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase
      .from("research")
      .delete()
      .eq("id", params.id);
    if (error) throw error;
    return NextResponse.json({ message: "تم الحذف" });
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
