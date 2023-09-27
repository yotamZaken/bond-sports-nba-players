import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Player, Players } from "./types";
import { find } from "lodash";
import { colorClasses, isColorDark } from "./color-classes";

interface PlayerContextType {
    apiURL: string;
    favoritePlayers: Players;
    toggleFavorite: (player: Player) => void;
    searchText?: string;
    setSearchText: Dispatch<SetStateAction<string>>;
    filteredPlayers: Player[];
    currentPage: number;
    totalPages: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    bgColorClass: string;
    textColorClass: string;
    generateRandomColor: () => void;
    colorClasses: Array<string>;
}

const PlayerContext = createContext({} as PlayerContextType);

export default function PlayerProvider({ children }: { children: any }) {
    const apiURL = "https://www.balldontlie.io/api/v1/players";

    const [favoritePlayers, setFavoritePlayers] = useState([] as Players);
    const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([] as Players);

    const [searchText, setSearchText] = useState('');

    const [currentPage, setCurrentPage ] = useState(1);
    const [totalPages, setTotalPages] = useState(50);

    const [bgColorClass, setBgColorClass] = useState<string>('#ffffff');
    const [textColorClass, setTextColorClass] = useState<string>('#000000');

    const generateRandomColor = () => {
        const randomNumber = Math.floor(Math.random() * colorClasses.length);
        const bgColorClass = colorClasses[randomNumber].slice()
        const textColorClass = isColorDark(bgColorClass) ? 'text-[#ffffff]' : 'text-[#000000]';

        setBgColorClass(bgColorClass);
        setTextColorClass(textColorClass);
    };

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

    const contextValue = {
        apiURL,
        favoritePlayers,
        toggleFavorite,
        searchText,
        setSearchText,
        filteredPlayers,
        currentPage,
        setCurrentPage,
        totalPages,
        bgColorClass,
        textColorClass,
        generateRandomColor,
        colorClasses
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    )
}

export function usePlayerContext() {
    return useContext(PlayerContext);
}
