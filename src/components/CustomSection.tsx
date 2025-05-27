
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CustomSectionProps {
  title: string;
  content: string;
  backgroundColor?: string;
  textColor?: string;
  showCard?: boolean;
}

const CustomSection: React.FC<CustomSectionProps> = ({
  title,
  content,
  backgroundColor = 'bg-background',
  textColor = 'text-foreground',
  showCard = true
}) => {
  const ContentWrapper = showCard ? Card : 'div';
  const InnerWrapper = showCard ? CardContent : 'div';

  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <ContentWrapper className={showCard ? "glass-effect tech-card max-w-4xl mx-auto" : ""}>
          <InnerWrapper className={showCard ? "p-8" : ""}>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 gradient-text text-center`}>
              {title}
            </h2>
            <div 
              className={`text-lg ${textColor} leading-relaxed space-y-4`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </InnerWrapper>
        </ContentWrapper>
      </div>
    </section>
  );
};

export default CustomSection;
