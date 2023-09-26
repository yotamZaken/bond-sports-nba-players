import { Players } from "../types";
import PlayerItem from "./player-item";
import { usePlayerContext } from "../player-context";

import clsx from "clsx";
import InputSearch from "./input-search";

//TODO:
// Make listTypes into an enum
type PlayerListProps = {
    title: string;
    // listType: "all" | "favorites";
    listType: string;
    players: Players;
}

export default function PlayerList({ title, players, listType, }: PlayerListProps) {
    const { filteredPlayers, favoritePlayers, listTypes } = usePlayerContext();

    return (
        <div className={clsx("border border-1 border-green-950 p-3 rounded", "grid grid-flow-row gap-y-3 p-3 content-start")}>
            <p className="font-bold"> { title } </p>
             <InputSearch listType={listType} />
            {listType === listTypes.all && filteredPlayers && filteredPlayers.map(player => (
                <PlayerItem listType={listType} player={player} key={player.id + Math.random().toFixed(2)} />
            ))}
            {listType === listTypes.favorites && favoritePlayers && favoritePlayers.map(player => (
                <PlayerItem listType={listType} player={player} key={player.id + Math.random().toFixed(2)} />
            ))}
        </div>
    )
}
