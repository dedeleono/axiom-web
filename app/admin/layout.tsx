import Header from "@/components/header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white text-brand-black">
      <Header />
      <div className="pt-24 md:pt-28">{children}</div>
    </div>
  );
}
