import { Players } from "../types";
import PlayerItem from "./PlayerItem";

type PlayerListProps = {
    title: string;
    listType: "all" | "favorites";
    players: Players;
}

export default function PlayerList({ title, players, listType, }: PlayerListProps) {
    return (
        <div className="border border-1 border-green-950">
            <p className="font-bold"> { title } </p>
                {players && players.map(player => (
                    <PlayerItem listType={listType} player={player} key={player.id + Math.random().toFixed(2)} />
                ))}
        </div>
    )
}
