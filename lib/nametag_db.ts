import { NameTagContent } from '@/components/NameTagForm';
import { getSession } from 'next-auth/react';

export async function fetchNametagFromDB(): Promise<NameTagContent | undefined> {
    const session = await getSession();

    if (session && session.user) {
        let nameTagToReturn = undefined;

        await fetch("/api/auth/users/userData/nameTag?userEmail=" + session.user.email, { method: "GET" })
        .then((res) => res.json())
        .then((resJson) => {
            if (resJson.success && resJson.nameTag) {
                nameTagToReturn = resJson.nameTag;
            }
            else {
                console.log("No nametag stored in DB.");
            }
        })
        .catch((error) => {
            console.error(error);
        });

        return nameTagToReturn;
    }
    else {
        console.error("User session is not defined.");
        return undefined;
    }
}

export async function updateNameTagInDB(newNameTag: NameTagContent) {
    const session = await getSession();

    if (session && session.user) {
        // The nametag visibility should always default to 'false' in the DB.
        newNameTag.visible = false;

        await fetch("/api/auth/users/userData/nameTag", { 
            method: "POST",
            body: JSON.stringify({
                email: session.user.email,
                nameTag: newNameTag
            }),
        })
        .then((res) => res.json())
        .catch((error) => {
            console.error(error);
        });
    }
}
