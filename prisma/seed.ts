import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: adminPassword,
      role: "admin",
    },
  });

  const defaultContent = [
    { key: "hero_title", value: "عمران سميح نزال" },
    { key: "hero_subtitle", value: "خبير في تدبر القرآن الكريم وعلومه وبيانه" },
    { key: "hero_description", value: "عاشق للقرآن الكريم، أ深耕 في تدبر آياته وعلومه وبيانه، أسعى لنشر فهم الكتاب الكريم بين المسلمين من خلال الدروس والأبحاث والكتب المتخصصة." },
    { key: "about_text", value: " عمران سميح نزال، خبير في تدبر القرآن الكريم وعلومه وبيانه. أ花费 عمري في دراسة كتاب الله تعالى وتدبر معانيه وعلومه النازلة عليه، من تفسير وقراءات وقواعد أحكام وناسخ ومنسوخ ومحكم ومتشابه وأسباب نزول ونحو ذلك. أسعى من خلال أعمالي إلى تعليم المسلمين كتابهم الكريم والعودة بالتفكر في آياته كما كان يفعل السلف الصالح." },
    { key: "about_image", value: "" },
    { key: "contact_email", value: "contact@omran-nazal.com" },
    { key: "youtube_url", value: "https://www.youtube.com/channel/UCrLF7D4Blxxlj4tbJeABaSA" },
    { key: "facebook_url", value: "https://www.facebook.com/profile.php?id=100063448434448" },
    { key: "footer_text", value: "© 2024 عمران سميح نزال. جميع الحقوق محفوظة." },
  ];

  for (const content of defaultContent) {
    await prisma.siteContent.upsert({
      where: { key: content.key },
      update: { value: content.value },
      create: content,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
