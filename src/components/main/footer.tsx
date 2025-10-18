import { Logo } from './logo';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo />
          <div className="text-center md:text-left">
            <p className="font-semibold">Contact Us</p>
            <p className="text-sm text-muted-foreground">123 Modern Ave, Webville, ST 12345</p>
            <p className="text-sm text-muted-foreground">contact@ecommodern.com</p>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-right">
            © {new Date().getFullYear()} E-Com Modern. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
