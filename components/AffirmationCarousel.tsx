
import React, { useState, useRef, useEffect } from 'react';
import { AffirmationCardContent, AffirmationCard } from '@/components/AffirmationCard';
import { AddNewAffirmationCard } from '@/components/AddNewAffirmationCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import '@/app/css/Affirmation.css';

interface AffirmationCarouselProps {
  initialAffirmations: AffirmationCardContent[];
}

export function AffirmationCarousel({
  initialAffirmations,
}: AffirmationCarouselProps) {
  const [affirmationList, setAffirmationList] = useState(initialAffirmations);
  const carouselRef = useRef<HTMLDivElement>(null); // Reference to the carousel div

  // Function to adjust the card size based on the carousel size
  const adjustCardSize = () => {
    if (carouselRef.current) {
      const height = carouselRef.current.clientHeight;

      // Update CSS variables for card height and font size (removed width)
      carouselRef.current.style.setProperty('--card-height', `${height}px`);
      carouselRef.current.style.setProperty('--font-size', `${Math.max(32, height / 10)}px`); // Minimum font size 16px
    }
  };

  // Function to handle vertical dragging and resizing of the carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    const startY = e.clientY;
    const startHeight = carouselRef.current?.offsetHeight || 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (carouselRef.current) {
        const deltaY = e.clientY - startY;
        const newHeight = Math.max(100, startHeight + deltaY); // Only change the height
        carouselRef.current.style.height = `${newHeight}px`; // Apply the new height
        adjustCardSize(); // Adjust card size based on new height
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Adjust card size whenever the carousel size changes
  useEffect(() => {
    adjustCardSize(); // Initial adjustment on mount
    const observer = new ResizeObserver(() => adjustCardSize());
    if (carouselRef.current) observer.observe(carouselRef.current);

    return () => {
      if (carouselRef.current) observer.unobserve(carouselRef.current);
    };
  }, []);

  const updateAffirmationCard = (id: number, updatedText: string) => {
    const updatedAffirmationList = affirmationList.map(affirmation =>
      affirmation.id === id ? { id, text: updatedText } : affirmation
    );
    setAffirmationList(updatedAffirmationList);
  };

  const deleteAffirmationCard = (id: number) => {
    setAffirmationList(affirmationList.filter(a => a.id !== id));
  };

  const addAffirmationCard = (cardText: string) => {
    let maxId = -1;
    affirmationList.forEach(card => {
      if (card.id > maxId) {
        maxId = card.id;
      }
    });
    const newCard = { id: maxId + 1, text: cardText };
    setAffirmationList([...affirmationList, newCard]);
  };

  return (
    <div
      ref={carouselRef}
      className="self-affirm-carousel"
      onMouseDown={handleMouseDown} // Allow dragging to resize vertically only
    >
      <Carousel>
        <CarouselContent>
          {affirmationList.map(affirmation => (
            <CarouselItem key={affirmation.id}>
              <AffirmationCard
                initialContent={affirmation}
                onAffirmationCardUpdate={updateAffirmationCard}
                onAffirmationCardDeletion={deleteAffirmationCard}
              />
            </CarouselItem>
          ))}
          <CarouselItem key="add-new-card">
            <AddNewAffirmationCard onCardAdd={addAffirmationCard} />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
