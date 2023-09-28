import PlayerList from "./player-list";
import { usePlayerContext } from "../player-context";

export default function ListContainer() {
    const { favoritePlayers, filteredPlayers } = usePlayerContext();

    return (
        <div>
            <p className="p-3 font-bold">NBA Players UI</p>
            <div className="grid grid-cols-2 gap-3 p-3 min-w-fit">
                <PlayerList isFavoritesList={false} players={filteredPlayers} title="All Players" />
                <PlayerList isFavoritesList={true} players={favoritePlayers} title="Favorite Players" />
            </div>
        </div>
    )
}
