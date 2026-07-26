import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "ملف مطلوب" }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\u0600-\u06FF_-]/g, "_")}`;

    const { data, error } = await supabase.storage
      .from("public")
      .upload(fileName, file, { contentType: file.type });

    if (error) throw error;

    const { data: urlData } = supabase.storage.from("public").getPublicUrl(data.path);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الرفع" }, { status: 500 });
  }
}
