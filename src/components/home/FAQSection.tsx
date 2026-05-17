'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: 'How far in advance should I book a tour?',
    answer: 'We recommend booking at least 2-3 weeks in advance for most tours. This gives us time to arrange logistics, prepare guides, and ensure you have the best experience. For large groups or custom tours, we ask for at least 4-6 weeks notice. However, we can sometimes accommodate last-minute bookings depending on availability.'
  },
  {
    question: 'What is included in the tour price?',
    answer: 'Tour prices typically include guided tours, entry fees to sites, most meals (breakfast, lunch, dinner), accommodation, and ground transportation. What\'s NOT included: international flights, travel insurance, personal expenses, tips for guides, and optional activities. Specific inclusions are listed on each tour page.'
  },
  {
    question: 'Is this suitable for families with children?',
    answer: 'Many of our tours are family-friendly! We have options for all ages and fitness levels. We can adjust pace and activities to suit children. Please let us know your children\'s ages during booking so we can recommend the best tours and make necessary arrangements.'
  },
  {
    question: 'What if I need to cancel or reschedule my booking?',
    answer: 'Cancellations made 30+ days before the tour start date receive a full refund. Between 15-29 days: 50% refund. Less than 15 days: no refund. Rescheduling to a different date is possible with at least 21 days notice and subject to availability.'
  },
  {
    question: 'Do you offer travel insurance?',
    answer: 'We recommend purchasing comprehensive travel insurance that covers trip cancellation, medical emergencies, and evacuation. While we don\'t sell insurance, we can provide recommendations for reputable providers. Travel insurance is especially important for international travel.'
  },
  {
    question: 'What is the physical fitness requirement?',
    answer: 'Our tours vary in physical demands. Some are leisurely (suitable for all fitness levels), while others involve hiking or walking on uneven terrain. We describe the difficulty level on each tour page. Contact us before booking if you have any concerns about your fitness level.'
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Have questions about our tours? We&apos;ve answered some common ones below. Don&apos;t see what you&apos;re looking for? <a href="mailto:contact@heritagetrailtours.com" className="text-primary hover:underline">Contact us</a>.
          </p>
        </div>

        <div className="space-y-3">
          {defaultFAQs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden bg-background"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
              >
                <span className="font-semibold text-foreground text-lg pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-border bg-muted/30 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-lg bg-primary/10 border border-primary/20 text-center">
          <h3 className="font-semibold text-foreground mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">
            Our team is here to help! Reach out via WhatsApp for instant support.
          </p>
          <Button>Contact Us on WhatsApp</Button>
        </div>
      </div>
    </section>
  );
}
