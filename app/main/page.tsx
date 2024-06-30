// Under Review

"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { SubmitHandler } from "react-hook-form";
import Tabs from "./Tabs";
import Mindfulness from "./Mindfulness";
import { NameTagContent, NameTagForm } from "@/components/NameTagForm";
import { WaveHandPicker } from "@/components/WaveHandPicker";
import { AffirmationCarousel, AffirmationContent } from '@/components/AffirmationCarousel';
import { HandWaveBadge, DrawBadgeApi } from "@/lib/draw_badge_api";
import { createFromConfig, ZoomApiWrapper } from "@/lib/zoomapi";
import { ConfigOptions }  from "@zoom/appssdk";
import { fetchNametagFromDB, updateNameTagInDB } from '@/lib/nametag_db';
import Divider from '@mui/material/Divider';
import { fetchAffirmationCardsFromDB } from '@/lib/affirmation_db';

const zoomConfigOptions: ConfigOptions = {
  capabilities: [
    "setVirtualForeground",
    "removeVirtualForeground",
  ]
};
const zoomApi: ZoomApiWrapper = createFromConfig(zoomConfigOptions);
const foregroundDrawer: DrawBadgeApi = new DrawBadgeApi(zoomApi);

const defaultWaveHandButtons = [
    '',
    'I\'m not done',
    'Question',
    'Agree',
    'Different Opinion',
    'Support',
];

const defaultAffirmations = [
    {id: 0, text: 'Say what I want to say, whatever happens will help me grow' },
    {id: 1, text: 'I can take up space'},
    {id: 2, text: 'I have an important voice'},
    {id: 3, text: 'Feel the tension and proceed'},
    {id: 4, text: 'I have the right to stutter'},
];

function App() {
  const [nameTagContent, setNameTagContent] = useState<NameTagContent>({
    visible:false,
    fullName:"",
    preferredName:"",
    pronouns:"",
    disclosure:"",
  });

  const [affirmationContent, setAffirmationContent] = useState<AffirmationContent[]>(defaultAffirmations);

  const [affirmationIsLoaded, setAffirmationIsLoaded] = useState(false);

  const [nameTagIsLoaded, setNameTagIsLoaded] = useState(false);

  const updateNameTagContent: SubmitHandler<NameTagContent> = (data) => {
    setNameTagContent(data);
    foregroundDrawer.drawNameTag(data);

    // Update nametag in DB
    updateNameTagInDB(data);
  };

  const updateHandWaveBadge = (badge: HandWaveBadge) => {
    foregroundDrawer.drawHandWave(badge);
  };

  //TODO: query and load user saved buttons;
  const savedWaveHandButtons = defaultWaveHandButtons;
  
  useEffect(() => {
    fetchNametagFromDB().then((newNameTag) => {
      if (newNameTag !== undefined) {
        setNameTagContent(newNameTag);
      }
      setNameTagIsLoaded(true);
    });

    fetchAffirmationCardsFromDB().then((affirmationCards)=> {
      if (affirmationCards !== undefined) {
        setAffirmationContent(affirmationCards);
      }
      setAffirmationIsLoaded(true);
    })
  }, []);

  return (
    <div>
      <div className="header">
        {affirmationIsLoaded &&
        <AffirmationCarousel
          initialAffirmations={affirmationContent}
        />}
      </div>

      <WaveHandPicker
        initialHands={savedWaveHandButtons}
        updateHandWaveBadge={updateHandWaveBadge}
      />


      <Divider />
      
      <div>
        <Tabs>
          <div page-label="nametag">
            {nameTagIsLoaded && <NameTagForm
              content={nameTagContent}
              onNameTagContentChange={updateNameTagContent}
            />}
          </div>

          <div page-label="mindfulness">
            <Mindfulness />
          </div>

        </Tabs>
      </div>
    </div>
  );
}

export default App;
