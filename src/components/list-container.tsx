import PlayerList from "./player-list";
import { useEffect } from "react";
import { usePlayerContext } from "../player-context";
import clsx from "clsx";

export default function ListContainer() {
    const { apiURL, allPlayers, favoritePlayers, setAllPlayers, listTypes } = usePlayerContext();

    useEffect(() => {
        const fetchPlayersData = async () => {
            try {
                const response = await fetch(`${apiURL}/?per_page=100`);
                const result = await response.json();

                setAllPlayers(result.data)
            } catch (e) {
                console.error("Failed to fetch players data", e);
            }
        }

        fetchPlayersData();
    }, []);

    return (
        <div className={clsx("grid grid-cols-2 gap-3 p-3", "border border-1 border-red-500")}>
            <PlayerList listType={listTypes.all} players={allPlayers} title="All Players" />
            <PlayerList listType={listTypes.favorites} players={favoritePlayers} title="Favorite Players" />
        </div>
    )
}
