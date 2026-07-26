export default function Loading({ text = "جاري التحميل..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 font-arabic">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-500 text-lg">{text}</p>
    </div>
  );
}
