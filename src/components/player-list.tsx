import { Players } from "../types";
import PlayerItem from "./player-item";
import { usePlayerContext } from "../player-context";

import clsx from "clsx";
import InputSearch from "./input-search";
import React from "react";
import Pagination from "./pagination";

type PlayerListProps = {
    title: string;
    isFavoritesList: boolean;
    players: Players;
}

export default function PlayerList({ title, players, isFavoritesList, }: PlayerListProps) {
    const { bgColorClass, textColorClass, generateRandomColor } = usePlayerContext();

    return (
        <div className={clsx("border border-1 border-green-950 p-3 rounded", "grid grid-flow-row gap-y-3 p-3 content-start", isFavoritesList && bgColorClass, isFavoritesList && textColorClass)}>
            <p className="font-bold"> { title } </p>
             <InputSearch isFavoritesList={isFavoritesList} />
            { isFavoritesList && (
                <button onClick={generateRandomColor}  >
                    Change Background Color
                </button>
            )}
            { players.map(player => (
                <PlayerItem
                    player={player}
                    isFavoritesList={isFavoritesList}
                    key={player.id + Math.random().toFixed(2)} />
            ))}
            { !isFavoritesList &&  <Pagination /> }
        </div>
    )
}
