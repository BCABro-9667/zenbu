import Footer from '@/components/main/footer';
import Navbar from '@/components/main/navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="px-[5%]">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
