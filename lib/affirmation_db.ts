import { AffirmationContent } from '@/components/AffirmationCarousel';
import { getSession } from 'next-auth/react';

export async function fetchAffirmationCardsFromDB(): Promise<AffirmationContent[] | undefined> {
    const session = await getSession();

    if (session && session.user) {
        let affirmationCards = undefined;

        await fetch("/api/auth/users/userData/affirmationCards?userEmail=" + session.user.email, { method: "GET" })
        .then((res) => res.json())
        .then((resJson) => {
            if (resJson.success && resJson.affirmationCards.length > 0) {
                affirmationCards = resJson.affirmationCards;
            }
            else {
                console.log("No affirmation cards stored in DB.");
            }
        })
        .catch((error) => {
            console.error(error);
        });

        return affirmationCards;
    }
    else {
        console.error("User session is not defined.");
        return undefined;
    }
}

export async function updateAffirmationCardsInDB(affirmationCards: AffirmationContent[]) {
    const session = await getSession();

    if (session && session.user) {
        await fetch("/api/auth/users/userData/affirmationCards", { 
            method: "POST",
            body: JSON.stringify({
                email: session.user.email,
                affirmationCards: affirmationCards
            }),
        })
        .then((res) => res.json())
        .catch((error) => {
            console.error(error);
        });
    }
}
