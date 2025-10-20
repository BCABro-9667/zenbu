
import { ContactForm } from '@/components/main/contact-form';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
            <p className="text-lg text-muted-foreground mt-2">
              We're here to help! Whether you have questions about our products, need help with an order, or just want to say hello, feel free to reach out.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <div className="flex items-start gap-4">
              <MapPin className="h-7 w-7 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Our Office</h3>
                <p className="text-muted-foreground">123 Furniture Lane, Decor City, 11001</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-7 w-7 text-primary mt-1 flex-shrink-0" />
               <div>
                <h3 className="font-semibold text-lg">Phone Support</h3>
                <p className="text-muted-foreground">1800 266 6123, 020 68197600</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-7 w-7 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Email Support</h3>
                <p className="text-muted-foreground">support@zenbu.com</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" asChild><Link href="#"><Facebook className="h-5 w-5" /></Link></Button>
              <Button variant="outline" size="icon" asChild><Link href="#"><Twitter className="h-5 w-5" /></Link></Button>
              <Button variant="outline" size="icon" asChild><Link href="#"><Linkedin className="h-5 w-5" /></Link></Button>
              <Button variant="outline" size="icon" asChild><Link href="#"><Instagram className="h-5 w-5" /></Link></Button>
              <Button variant="outline" size="icon" asChild><Link href="#"><Youtube className="h-5 w-5" /></Link></Button>
            </div>
          </div>
        </div>
        <div>
          <ContactForm title="Send Us a Message" description="We typically respond within 24 hours." />
        </div>
      </div>
      <div>
         <h3 className="font-semibold text-2xl text-center mb-6">Find Us Here</h3>
         <div className="aspect-video w-full">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.297592942416!2d-122.419415484681!3d37.77492957975815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c1b2b3ce9%3A0x297298642a42b10!2sSan%20Francisco%20City%20Hall!5e0!3m2!1sen!2sus!4v1620067339732!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="rounded-lg"
            ></iframe>
         </div>
      </div>
    </div>
  );
}
