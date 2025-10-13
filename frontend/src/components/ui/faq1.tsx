import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq1Props {
  heading?: string;
  description?: string;
  items?: FaqItem[];
  ctaText?: string;
  ctaDescription?: string;
}

const Faq1 = ({
  heading = "Frequently Asked Questions",
  description = "Find answers to common questions about our coffee house.",
  items = [
    {
      id: "faq-1",
      question: "What are your opening hours?",
      answer:
        "We’re open daily from 9:00 AM to 6:00 PM, including weekends and holidays.",
    },
    {
      id: "faq-2",
      question: "Do you offer plant-based milk options?",
      answer:
        "Yes! We offer almond, oat, and soy milk for all our coffee and tea drinks.",
    },
    {
      id: "faq-3",
      question: "Can I order online for pickup?",
      answer:
        "Absolutely! You can order through our website or mobile app and pick up your order in-store.",
    },
    {
      id: "faq-4",
      question: "Do you have gluten-free or vegan snacks?",
      answer:
        "Yes, we have a selection of gluten-free pastries and vegan treats available daily.",
    },
    {
      id: "faq-5",
      question: "Do you offer gift cards?",
      answer:
        "Yes, we have both physical and digital gift cards available for purchase in-store or online.",
    },
  ],
  ctaText = "Still have questions?",
  ctaDescription = "Our friendly team is here to help. Reach out and we'll get back to you soon.",
}: Faq1Props) => {
  return (
    <section
      id="faq"
      className="relative py-16 md:py-20 bg-background overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 transition-all duration-300">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 mb-5 shadow-md shadow-primary/10">
            <HelpCircle className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            {heading}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            {description}
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="group bg-card border border-border rounded-lg shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-semibold text-base px-5 py-4 hover:no-underline hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-primary/30 rounded-t-lg transition-all">
                <div className="flex items-start gap-3 w-full pr-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center mt-0.5 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-bold text-xs">Q</span>
                  </div>
                  <span className="flex-1">{item.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 pt-1 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-md bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground font-bold text-xs">
                      A
                    </span>
                  </div>
                  <p className="flex-1 text-muted-foreground text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Call to Action */}
        <div className="mt-14 text-center">
          <div className="inline-block bg-card rounded-2xl shadow-lg p-8 border border-border max-w-md hover:shadow-xl transition-all duration-300">
            <MessageCircle className="w-10 h-10 text-primary mx-auto mb-3 animate-pulse" />
            <h3 className="text-lg font-semibold mb-2">{ctaText}</h3>
            <p className="text-muted-foreground text-sm mb-5">
              {ctaDescription}
            </p>
            <Button size="sm" className="gap-2" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Faq1 };
