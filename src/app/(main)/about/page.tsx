
import { Button } from '@/components/ui/button';
import { Award, Target, Rocket, Lightbulb, ShieldCheck, Gem, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About Zenbu</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Founded in 2023, Zenbu is dedicated to revolutionizing the home and office appliance industry by providing high-quality, innovative, and customizable solutions for modern living and workspaces.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Zenbu was founded with a vision to bring smart, practical, and innovative appliances to every home and office. We saw a need for products that were not only functional and durable but also customizable to fit the unique needs of our customers. Our journey began with a small team of passionate engineers and designers, and has grown into a brand trusted for its quality and ingenuity.
          </p>
          <p className="font-semibold">Our core expertise lies in Home & Office Security, Kitchen Solutions, and creating customizable appliances that enhance everyday efficiency.</p>
        </div>
        <div className="bg-muted/50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Our Mission & Vision</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Rocket className="h-6 w-6 text-primary" />
                <h4 className="font-semibold text-lg">Mission</h4>
              </div>
              <p className="text-muted-foreground">To craft high-quality appliances that simplify tasks, enhance security, and bring innovative solutions to homes and offices.</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-6 w-6 text-primary" />
                <h4 className="font-semibold text-lg">Vision</h4>
              </div>
              <p className="text-muted-foreground">To be the leading name in customizable and smart appliances, creating products that are cherished for their reliability and design.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 border rounded-lg">
                <Lightbulb className="h-8 w-8 text-primary mx-auto mb-3"/>
                <h4 className="font-semibold text-lg">Innovation</h4>
                <p className="text-sm text-muted-foreground mt-1">We constantly push the boundaries of design and technology.</p>
            </div>
            <div className="p-6 border rounded-lg">
                <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-3"/>
                <h4 className="font-semibold text-lg">Integrity</h4>
                <p className="text-sm text-muted-foreground mt-1">We are transparent in our manufacturing and business practices.</p>
            </div>
             <div className="p-6 border rounded-lg">
                <Gem className="h-8 w-8 text-primary mx-auto mb-3"/>
                <h4 className="font-semibold text-lg">Quality</h4>
                <p className="text-sm text-muted-foreground mt-1">Uncompromising craftsmanship in every product we create.</p>
            </div>
             <div className="p-6 border rounded-lg">
                <Users className="h-8 w-8 text-primary mx-auto mb-3"/>
                <h4 className="font-semibold text-lg">Customer Satisfaction</h4>
                <p className="text-sm text-muted-foreground mt-1">Our customers are at the heart of everything we do.</p>
            </div>
        </div>
      </div>
      
      <div className="bg-card p-8 rounded-lg border mb-16">
        <h2 className="text-3xl font-bold text-center mb-6">Achievements & Milestones</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Award className="h-10 w-10 text-primary mx-auto mb-2" />
            <p className="font-semibold text-lg">"Best Smart Appliance" Award 2024</p>
            <p className="text-sm text-muted-foreground">Awarded by Tech Innovations Magazine</p>
          </div>
          <div>
            <Users className="h-10 w-10 text-primary mx-auto mb-2" />
            <p className="font-semibold text-lg">25,000+ Happy Customers</p>
            <p className="text-sm text-muted-foreground">Serving homes & offices nationwide</p>
          </div>
          <div>
            <Award className="h-10 w-10 text-primary mx-auto mb-2" />
            <p className="font-semibold text-lg">Certified for Quality Standards</p>
            <p className="text-sm text-muted-foreground">Meeting high standards of safety and performance</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">We are committed to providing you with an exceptional experience from start to finish.</p>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          <div className="p-4 bg-muted/30 rounded-lg"><strong>Durable Materials:</strong> Built to last and perform.</div>
          <div className="p-4 bg-muted/30 rounded-lg"><strong>Client-Centric Approach:</strong> Your satisfaction is our priority.</div>
          <div className="p-4 bg-muted/30 rounded-lg"><strong>Innovative Design:</strong> Products that simplify and improve your life.</div>
        </div>
        <Button asChild size="lg">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>
    </div>
  );
}
