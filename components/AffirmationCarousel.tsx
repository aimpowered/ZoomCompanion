import React from 'react';
import { AffirmationCard } from '@/components/AffirmationCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


interface AffirmationCarouselProps {
  initialAffirmations: string[];
}

export function AffirmationCarousel({
  initialAffirmations,
}: AffirmationCarouselProps) {
  return (
    <Carousel>
      <CarouselContent className="items-center">
        {initialAffirmations.map((text, index) => (
          <CarouselItem key={text}>
            <AffirmationCard
              text={text}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
