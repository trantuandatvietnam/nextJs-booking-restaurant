import axios from "axios";
import { useState } from "react";

export default function useReservation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createReservation = async ({
        slug,
        partySize,
        day,
        time,
        bookerFirstName,
        bookerLastName,
        bookerPhone,
        bookerEmail,
        bookerOccassion,
        bookerRequest,
    }: {
        slug: string;
        partySize: string;
        day: string;
        time: string;
        bookerFirstName: string,
        bookerLastName: string,
        bookerPhone: string,
        bookerEmail: string,
        bookerOccassion: string,
        bookerRequest: string,
    }, setDidBook: React.Dispatch<React.SetStateAction<boolean>>) => {
        setLoading(true);

        try {
            const response = await axios.post(
                `http://localhost:3000/api/restaurant/${slug}/reserve`, {
                bookerFirstName,
                bookerLastName,
                bookerPhone,
                bookerEmail,
                bookerOccassion,
                bookerRequest,
            }, {
                params: {
                    day,
                    time,
                    partySize
                },
            }
            );
            setLoading(false)
            setDidBook(true)
            return response.data
        } catch (error: any) {
            console.log(error);
            setLoading(false)
            setDidBook(false)
            setError(error.response.data.errorMessage)
        }
    };
    return { createReservation, loading, error };
}
