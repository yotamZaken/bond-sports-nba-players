import PlayerList from "./player-list";
import { usePlayerContext } from "../player-context";
import clsx from "clsx";

export default function ListContainer() {
    const { favoritePlayers, filteredPlayers } = usePlayerContext();

    return (
        <div className={clsx("grid grid-cols-2 gap-3 p-3", "border border-1 border-red-500")}>
            <PlayerList isFavoritesList={false} players={filteredPlayers} title="All Players" />
            <PlayerList isFavoritesList={true} players={favoritePlayers} title="Favorite Players" />
        </div>
    )
}
