import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const books = [
    {
      title: "تدبر آيات السورة المباركة",
      description: "كتاب متخصص في تدبر وتأمل آيات القرآن الكريم جزءاً جزءاً، يأخذ القارئ في رحلة عميقة عبر معاني الآيات وحكمها وأسرارها، مع التركيز على التطبيق العملي للتدبر في الحياة اليومية.",
      author: "عمران سميح نزال",
      coverImage: "/uploads/books/book-01.png",
      category: "تدبر القرآن",
      publishDate: "2024",
      featured: true,
    },
    {
      title: "علوم القرآن الكريم",
      description: "موسوعة شاملة تغطي أهم علوم القرآن الكريم من نسخ وناسخ، محكم ومتشابه، مدني ومكي، أسباب النزول، والتنزيل والتأويل، مع شرح مبسط لكل علم من هذه العلوم.",
      author: "عمران سميح نزال",
      coverImage: "/uploads/books/book-02.png",
      category: "علوم القرآن",
      publishDate: "2024",
      featured: true,
    },
    {
      title: "قواعد التجويد والترتيل",
      description: "دليل شامل لتعلم قواعد التجويد و Rules الترتيل، يغطي جميع القواعد من الأحكام الخ庐ية والرومية مع الأمثلة العملية والتمارين التطبيقية للمستوى المبتدئ والمتوسط والمتقدم.",
      author: "عمران سميح نزال",
      coverImage: "/uploads/books/book-03.png",
      category: "تجويد القرآن",
      publishDate: "2024",
      featured: true,
    },
    {
      title: "الناسخ والمنسوخ في القرآن الكريم",
      description: "دراسة أكاديمية متخصصة في باب الناسخ والمنسوخ من أبرز أبواب علوم القرآن، تجمع بين الأصالة العلمية والطرح المبسط، مع عرض أقوال العلماء وترجيحات مؤلفه.",
      author: "عمران سميح نزال",
      coverImage: "/uploads/books/book-04.png",
      category: "علوم القرآن",
      publishDate: "2023",
      featured: false,
    },
    {
      title: "أسرار أسماء الله الحسنى في القرآن",
      description: "كتاب يغوص في تدبر معاني أسماء الله الحسنى الواردة في القرآن الكريم، ويستخلص الدروس والعبر من كل اسم، مع ربط المعاني بسياق النزول والتطبيق في حياة المسلم.",
      author: "عمران سميح نزال",
      coverImage: "/uploads/books/book-05.png",
      category: "تدبر القرآن",
      publishDate: "2023",
      featured: true,
    },
    {
      title: "القراءات القرآنية المتواترة",
      description: "تقديم علمي للقراءات القرآنية العشر المتواترة، يشرح أصولها وقواعد الاحتجاج لها، ويربط بينها وبين فقه اللغة العربية وعلوم النحو والصرف، مع أمثلة تطبيقية.",
      author: "عمران سميح نزال",
      coverImage: "/uploads/books/book-06.png",
      category: "القراءات القرآنية",
      publishDate: "2024",
      featured: false,
    },
    {
      title: "أسباب النزول وأثرها في فهم الآيات",
      description: "بحث معمّق في Importance أسباب النزول وأثرها في تفسير وفهم آيات القرآن الكريم، يتناول أبرز الأسباب النازلة ويبين كيف تغير فهم الآية عند معرفة سبب نزولها.",
      author: "عمران سميح نزال",
      coverImage: "/uploads/books/book-07.png",
      category: "أسباب النزول",
      publishDate: "2023",
      featured: false,
    },
    {
      title: "المحكم والمتشابه في القرآن",
      description: "دراسة لبنة المتقاطعة بين المحكم والمتشابه من آيات القرآن الكريم، تستكشف المعايير التي فرق بها العلماء بين النوعين، مع تحليل لآيات المتشابه و cách فهمها.",
      author: "عمران سميح نزال",
      coverImage: "/uploads/books/book-08.png",
      category: "علوم القرآن",
      publishDate: "2024",
      featured: false,
    },
    {
      title: "الشفاء الروحي بتدبر القرآن",
      description: "كتاب يعرض فوائد التدبر الروحية والنفسية للقرآن الكريم، مبني على الأحاديث النبوية حول فضل التلاوة والتدبر، مع تجارب عملية وapllications لتطبيق التدبر في حياتنا.",
      author: "عمران سميح نزال",
      coverImage: "/uploads/books/book-09.png",
      category: "تدبر القرآن",
      publishDate: "2023",
      featured: true,
    },
    {
      title: "أصول التفسير ومناهجه",
      description: "إرشاد علمي ل-learning أصول علم التفسير وأهم مناهجه من تفسير بالمأثور وtafseer بالرأي، مع عرض لأهم كتب التفسير عبر العصور وميزة كل منها.",
      author: "عمران سميح نزال",
      coverImage: "/uploads/books/book-10.png",
      category: "أصول التفسير",
      publishDate: "2024",
      featured: false,
    },
    {
      title: "آداب التلاوة والسماع",
      description: "كتاب يجمع آداب تلاوة القرآن الكريم وسماعه من الكتاب والسنة وأقوال العلماء، يشمل الأداب الظاهرة والباطنة، وآداب الخادم للقرآن والقائمين بتعليمه.",
      author: "عمران سميح نزال",
      coverImage: "/uploads/books/book-11.png",
      category: "آداب التلاوة",
      publishDate: "2023",
      featured: false,
    },
    {
      title: "المفردات القرآنية وأثرها في الفهم",
      description: "دراسة لغوية دلالية لـ key المفردات والكلمات المفتاحية الواردة في القرآن الكريم، تبحث في المعاني الأصلية لكلمة وتطورها ودلالاتها في سياق التنزيل.",
      author: "عمران سميح نزال",
      coverImage: "/uploads/books/book-12.png",
      category: "لغة القرآن",
      publishDate: "2024",
      featured: false,
    },
  ];

  for (const book of books) {
    const existing = await prisma.book.findFirst({ where: { title: book.title } });
    if (!existing) {
      await prisma.book.create({ data: book });
      console.log(`Added: ${book.title}`);
    } else {
      console.log(`Skipped (exists): ${book.title}`);
    }
  }

  console.log("\nAll books added successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
