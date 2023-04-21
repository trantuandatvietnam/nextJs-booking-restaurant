import axios from "axios";
import { useState } from "react";

export default function useAvailabilities() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState<{ time: string, available: boolean }[] | null>(null);
    const fetchAvailabitities = async ({
        slug,
        partySize,
        day,
        time,
    }: {
        slug: string;
        partySize: string;
        day: string;
        time: string;
    }) => {
        setLoading(true);

        try {
            const response = await axios.get(
                `http://localhost:3000/api/restaurant/${slug}/availability`, {
                params: {
                    day,
                    time,
                    partySize
                }
            }
            );
            setLoading(false)
            setData(response.data.availabilities)
        } catch (error: any) {
            console.log(error);
            setLoading(false)
            setError(error.response.data.errorMessage)
        }
    };
    return { fetchAvailabitities, loading, data, error };
}
