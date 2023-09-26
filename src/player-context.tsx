import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Player, Players, ListTypes } from "./types";
import { debounce, find } from "lodash";

//TODO:
// Make listTypes into an enum
type PlayerContextType = {
    apiURL: string;
    allPlayers: Players;
    setAllPlayers: Dispatch<SetStateAction<Players>>;
    favoritePlayers: Players;
    toggleFavorite: (player: Player) => void;
    searchText?: string;
    setSearchText: Dispatch<SetStateAction<string>>;
    filteredPlayers: Player[];
    setFilteredPlayers: Dispatch<SetStateAction<Players>>;
    listTypes: { all: string; favorites: string };
};

const PlayerContext = createContext({} as PlayerContextType);

export function PlayerProvider({ children }: { children: any }) {
    const apiURL = "https://www.balldontlie.io/api/v1/players";
    // const listTypes = { all: ListTypes.all , favorites: ListTypes.favorites };
    const listTypes = { all: "all" , favorites: "favorites" };
    const [allPlayers, setAllPlayers] = useState([] as Players);
    const [favoritePlayers, setFavoritePlayers] = useState([] as Players);
    const [searchText, setSearchText] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(allPlayers);

    // Create a debounced function to update the filtered list
    // const debouncedFilterPlayers = debounce((text: string) => {
    //     const filtered = allPlayers.filter((player) =>
    //         player.first_name.toLowerCase().includes(text.toLowerCase())
    //             ||
    //         player.last_name.toLowerCase().includes(text.toLowerCase())
    //     );
    //     setFilteredPlayers(filtered);
    // }, 300);

    useEffect(() => {
        const fetchPlayersData = async () => {
            try {
                const response = await fetch(`${apiURL}/?search=${searchText}`);
                const result = await response.json();
                setFilteredPlayers(result.data)

            } catch (e) {
                console.error("Failed to fetch players data", e);
            }
        }

        fetchPlayersData();
    }, [searchText]);

    // Update the filteredPlayers when searchText changes
    // useEffect(() => {
    //     debouncedFilterPlayers(searchText);
    //     // // Cleanup the debounce function when component unmounts
    //     // return () => debouncedFilterPlayers.cancel();
    // }, [searchText, debouncedFilterPlayers]);


    const toggleFavorite = (clickedPlayer: Player) => {
        const alreadyFavorite = find(favoritePlayers, (player) => { return clickedPlayer.id === player.id });

        if (alreadyFavorite) {
            setFavoritePlayers(favoritePlayers.filter(player => { return clickedPlayer.id !== player.id }));
        } else {
            setFavoritePlayers((prevFavorites) => [...prevFavorites, clickedPlayer]);
        }
    };

    return (
        <PlayerContext.Provider value={{ apiURL, listTypes, allPlayers, favoritePlayers, setAllPlayers, toggleFavorite, searchText, setSearchText, filteredPlayers, setFilteredPlayers }}>
            {children}
        </PlayerContext.Provider>
    )
}

export function usePlayerContext() {
    return useContext(PlayerContext);
}
