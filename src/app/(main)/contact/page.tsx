
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
                <p className="text-muted-foreground">Plot No. 89, Sector-59, HSIIDC Industrial Estate, Faridabad, Haryana - 121 004</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-7 w-7 text-primary mt-1 flex-shrink-0" />
               <div>
                <h3 className="font-semibold text-lg">Phone Support</h3>
                <p className="text-muted-foreground">9810038219</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-7 w-7 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Email Support</h3>
                <p className="text-muted-foreground">info@zenbu.com</p>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.835824283834!2d77.30792821507797!3d28.42468308250005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdc7a5f5f5f5d%3A0x8e7e4d8f2f2f2f2f!2sHSIIDC%2C%20Sector%2059%2C%20Faridabad%2C%20Haryana%20121004!5e0!3m2!1sen!2sin!4v1620067339732!5m2!1sen!2sin"
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
