
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
          Founded in 2023, Zenbu is dedicated to revolutionizing the furniture industry by providing high-quality, stylish, and sustainable pieces for modern living.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Zenbu was founded with a vision to bring smart automation and innovative software solutions to businesses. We saw a gap in the market for furniture that was not only beautiful and functional but also ethically sourced and built to last. Our journey began with a small team of passionate designers and craftspeople, and has grown into a brand trusted by homeowners and designers alike.
          </p>
          <p className="font-semibold">Our core expertise lies in Modern Furniture Design, Sustainable Manufacturing, and creating E-commerce experiences that delight our customers.</p>
        </div>
        <div className="bg-muted/50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Our Mission & Vision</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Rocket className="h-6 w-6 text-primary" />
                <h4 className="font-semibold text-lg">Mission</h4>
              </div>
              <p className="text-muted-foreground">To craft beautiful, sustainable furniture that enhances everyday living and inspires mindful consumption.</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-6 w-6 text-primary" />
                <h4 className="font-semibold text-lg">Vision</h4>
              </div>
              <p className="text-muted-foreground">To be the leading name in conscious home furnishing, creating timeless pieces that are cherished for generations.</p>
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
                <p className="text-sm text-muted-foreground mt-1">We constantly push the boundaries of design and material science.</p>
            </div>
            <div className="p-6 border rounded-lg">
                <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-3"/>
                <h4 className="font-semibold text-lg">Integrity</h4>
                <p className="text-sm text-muted-foreground mt-1">We are transparent in our sourcing and business practices.</p>
            </div>
             <div className="p-6 border rounded-lg">
                <Gem className="h-8 w-8 text-primary mx-auto mb-3"/>
                <h4 className="font-semibold text-lg">Quality</h4>
                <p className="text-sm text-muted-foreground mt-1">Uncompromising craftsmanship in every piece we create.</p>
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
            <p className="font-semibold text-lg">"Best Eco-Friendly Furniture" Award 2024</p>
            <p className="text-sm text-muted-foreground">Awarded by Green Design Magazine</p>
          </div>
          <div>
            <Users className="h-10 w-10 text-primary mx-auto mb-2" />
            <p className="font-semibold text-lg">10,000+ Happy Customers</p>
            <p className="text-sm text-muted-foreground">Serving homes across the country</p>
          </div>
          <div>
            <Award className="h-10 w-10 text-primary mx-auto mb-2" />
            <p className="font-semibold text-lg">Certified B Corporation</p>
            <p className="text-sm text-muted-foreground">Meeting high standards of social and environmental performance</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">We are committed to providing you with an exceptional experience from start to finish.</p>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          <div className="p-4 bg-muted/30 rounded-lg"><strong>Sustainable Materials:</strong> Ethically sourced and environmentally friendly.</div>
          <div className="p-4 bg-muted/30 rounded-lg"><strong>Client-Centric Approach:</strong> Your satisfaction is our priority.</div>
          <div className="p-4 bg-muted/30 rounded-lg"><strong>Timeless Design:</strong> Pieces that transcend trends and last a lifetime.</div>
        </div>
        <Button asChild size="lg">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>
    </div>
  );
}
