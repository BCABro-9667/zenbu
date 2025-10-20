
import { Mail, MapPin, Phone } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">About Zenbu</h1>
          <p className="text-lg text-muted-foreground">
            Welcome to Zenbu, where we believe that furniture should be more than just functional; it should be an expression of your style, a foundation for your memories, and a timeless part of your home.
          </p>
          <p className="text-muted-foreground">
            Founded on the principles of quality craftsmanship, sustainable sourcing, and modern design, Zenbu offers curated collections that bring comfort and elegance to every room. Our mission is to help you create a space that you love, with pieces that are built to last.
          </p>
          <div className="space-y-4 pt-4 inline-flex flex-col items-start text-left">
            <div className="flex items-center gap-4">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-muted-foreground">123 Furniture Lane, Decor City, 11001</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-6 w-6 text-primary" />
              <span className="text-muted-foreground">1800 266 6123</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <span className="text-muted-foreground">support@zenbu.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
