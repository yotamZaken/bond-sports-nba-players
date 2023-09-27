import PlayerList from "./player-list";
import { usePlayerContext } from "../player-context";
import clsx from "clsx";

export default function ListContainer() {
    const { allPlayers, favoritePlayers, listTypes } = usePlayerContext();

    return (
        <div className={clsx("grid grid-cols-2 gap-3 p-3", "border border-1 border-red-500")}>
            <PlayerList listType={listTypes.all} players={allPlayers} title="All Players" />
            <PlayerList listType={listTypes.favorites} players={favoritePlayers} title="Favorite Players" />
        </div>
    )
}
