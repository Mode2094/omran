import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: contents, error } = await supabase
      .from("site_content")
      .select("*");
    if (error) throw error;
    const result: Record<string, string> = {};
    contents?.forEach((c: any) => { result[c.key] = c.value; });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ error: "المفتاح والقيمة مطلوبان" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("site_content")
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
