import React, { useState } from 'react';
import { AffirmationCardContent, AffirmationCard } from '@/components/AffirmationCard';
import { AddNewAffirmationCard } from '@/components/AddNewAffirmationCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import '@/app/css/Affirmation.css'
import { updateAffirmationCardsInDB } from '@/lib/affirmation_db';

export interface AffirmationContent {
  id: number;
  text: string;
}

interface AffirmationCarouselProps {
  initialAffirmations: AffirmationCardContent[];
}

export function AffirmationCarousel({
  initialAffirmations,
}: AffirmationCarouselProps) {
  const [affirmationList, setAffirmationList] = useState(
    initialAffirmations
  );

  const updateAffirmationCard = (id: number, updatedText: string) => {
    // TODO: log updated AffirmationList in DB
    const updatedAffirmationList = affirmationList.map(affirmation => {
        if (affirmation.id == id) {
          return {id: id, text: updatedText};
        } else {
          return affirmation;
        }
    });
    setAffirmationList(updatedAffirmationList);
    saveAffirmationList(affirmationList);
  }

  // TODO: propogate the change to root to delete card in DB
  const deleteAffirmationCard = (id: number) => {
    setAffirmationList(
      affirmationList.filter(a => a.id != id)
    );
    saveAffirmationList(affirmationList);
  };

  // TODO: propogate the change to root to add new card to DB
  const addAffirmationCard = (cardText: string) => {
    let maxId = -1;
    affirmationList.forEach(card => {
      if (card.id > maxId) {
        maxId = card.id;
      }
    });
    const newCard = {id: maxId + 1, text: cardText};
    setAffirmationList([...affirmationList, newCard]);
    saveAffirmationList(affirmationList);
  };

  const saveAffirmationList = (affirmationList: AffirmationContent[]) => {
    console.log("Saving affirmation list to DB");
    console.log(affirmationList);
    updateAffirmationCardsInDB(affirmationList)
  }

  return (
    <Carousel>
      <CarouselContent className="self-affirm-carousel">
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
          <AddNewAffirmationCard
            onCardAdd={addAffirmationCard}
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
