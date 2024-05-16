import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardMedia";

interface AffirmationCardProps {
 text: string;
}

// TODO: use CardAction component to add action
export function AffirmationCard({text}: AffirmationCardProps) {
  return (
    <Card className="self-affirm-card">
      <CardContent className="self-affirm-text">
        {text}
      </CardContent>
    </Card>
  );
}

