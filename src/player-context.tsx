import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Player, Players, ListTypes } from "./types";
import { find } from "lodash";

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
    currentPage: number;
    totalPages: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
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

    // Pagination related state
    const [currentPage, setCurrentPage ] = useState(1);
    const [totalPages, setTotalPages] = useState(50);

    useEffect(() => {
        const fetchPlayersData = async () => {
            try {
                let response;

                if (searchText.length > 0) {
                    response = await fetch(`${apiURL}/?search=${searchText}`);
                } else {
                    response = await fetch(`${apiURL}/?page=${currentPage}?per_page=${100}`);
                }

                const result = await response.json();
                setCurrentPage(result.meta.current_page);
                setTotalPages(result.meta.total_pages);
                setFilteredPlayers(result.data)

            } catch (e) {
                console.error("Failed to fetch players data", e);
            }
        }

        fetchPlayersData();
    }, [searchText, currentPage]);

    const toggleFavorite = (clickedPlayer: Player) => {
        const alreadyFavorite = find(favoritePlayers, (player) => { return clickedPlayer.id === player.id });

        if (alreadyFavorite) {
            setFavoritePlayers(favoritePlayers.filter(player => { return clickedPlayer.id !== player.id }));
        } else {
            setFavoritePlayers((prevFavorites) => [...prevFavorites, clickedPlayer]);
        }
    };

    return (
        <PlayerContext.Provider value={{ apiURL, listTypes, allPlayers, favoritePlayers, setAllPlayers, toggleFavorite, searchText, setSearchText, filteredPlayers, setFilteredPlayers, currentPage, setCurrentPage, totalPages }}>
            {children}
        </PlayerContext.Provider>
    )
}

export function usePlayerContext() {
    return useContext(PlayerContext);
}
