import React, { useState, useRef } from 'react';
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
  const carouselRef = useRef<HTMLDivElement>(null);

  // Function to handle vertical dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    const startY = e.clientY; // Initial Y position
    const startHeight = carouselRef.current?.offsetHeight || 0; // Initial height of the carousel

    const handleMouseMove = (e: MouseEvent) => {
      if (carouselRef.current) {
        const deltaY = e.clientY - startY; // Calculate vertical movement
        const newHeight = Math.max(100, startHeight + deltaY); // New height, with a minimum limit
        carouselRef.current.style.height = `${newHeight}px`; // Apply new height
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove); // Stop listening when mouse is released
      window.removeEventListener('mouseup', handleMouseUp); // Clean up
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const updateAffirmationCard = (id: number, updatedText: string) => {
    // TODO: log updated AffirmationList in DB
    const updatedAffirmationList = affirmationList.map(affirmation => {
      if (affirmation.id === id) {
        return { id: id, text: updatedText };
      } else {
        return affirmation;
      }
    });
    setAffirmationList(updatedAffirmationList);
  };

  const deleteAffirmationCard = (id: number) => {
    setAffirmationList(
      affirmationList.filter(a => a.id !== id)
    );
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
      onMouseDown={handleMouseDown} // Add mouse down event to start dragging
    >
      <Carousel>
        <CarouselContent>
          {affirmationList.map(affirmation => (
            <CarouselItem key={affirmation.text}>
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
