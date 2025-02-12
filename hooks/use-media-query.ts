import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        // Ensure this only runs on the client
        if (typeof window === "undefined") return;

        const mediaQueryList = window.matchMedia(query);

        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Set the initial state
        setMatches(mediaQueryList.matches);

        // Add listener for media query changes
        mediaQueryList.addEventListener("change", handleChange);

        // Cleanup listener on unmount
        return () => {
            mediaQueryList.removeEventListener("change", handleChange);
        };
    }, [query]);

    return matches;
};
