import Footer from '@/components/main/footer';
import Navbar from '@/components/main/navbar';
import { TopBar } from '@/components/main/top-bar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <div className="px-[5%]">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
