import React, { createContext, useContext, useState } from "react";
import { Player, Players } from "./types";
import { find } from "lodash";

//TODO: Fix context any type
type PlayerContextType = any;

const PlayerContext = createContext({} as PlayerContextType);

//TODO: fix children any type
export function PlayerProvider({ children }: { children: any }) {
    const [allPlayers, setAllPlayers] = useState([] as Players);
    const [favoritePlayers, setFavoritePlayers] = useState([] as Players);

    const toggleFavorite = (clickedPlayer: Player) => {
        const alreadyFavorite = find(favoritePlayers, (player) => { return clickedPlayer.id === player.id });

        if (alreadyFavorite) {
            setFavoritePlayers(favoritePlayers.filter(player => { return clickedPlayer.id !== player.id }));
        } else {
            setFavoritePlayers((prevFavorites) => [...prevFavorites, clickedPlayer]);
        }
    };

    return (
        <PlayerContext.Provider value={{ allPlayers, favoritePlayers, setAllPlayers, toggleFavorite }}>
            {children}
        </PlayerContext.Provider>
    )
}

export function usePlayerContext() {
    return useContext(PlayerContext);
}
