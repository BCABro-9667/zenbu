
import { ContactForm } from '@/components/main/contact-form';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            We're here to help! Whether you have questions about our products, need help with an order, or just want to say hello, feel free to reach out.
          </p>
          <p className="text-muted-foreground">
            Our team is available Monday to Saturday, from 9:15 AM to 6:15 PM to assist you with all your needs. We look forward to connecting with you.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Our Office</h3>
                <p className="text-muted-foreground">123 Furniture Lane, Decor City, 11001</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
               <div>
                <h3 className="font-semibold">Phone Support</h3>
                <p className="text-muted-foreground">1800 266 6123, 020 68197600</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-muted-foreground">support@zenbu.com</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ContactForm title="Send Us a Message" description="We typically respond within 24 hours." />
        </div>
      </div>
    </div>
  );
}
