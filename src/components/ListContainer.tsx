import PlayerList from "./PlayerList";
import { useEffect } from "react";
import { usePlayerContext } from "../player-context";

const apiURL = "https://www.balldontlie.io/api/v1/players";

export default function ListContainer() {
    const { allPlayers, favoritePlayers, setAllPlayers } = usePlayerContext();

    useEffect(() => {
        const fetchPlayersData = async () => {
            try {
                const response = await fetch(apiURL);
                const result = await response.json();
                setAllPlayers(result.data)
            } catch (e) {
                console.error("Failed to fetch players data", e);
            }
        }

        fetchPlayersData();
    }, []);

    return (
        <div className="border border-1 border-red-500 grid grid-cols-2 gap-3 p-3">
            <PlayerList listType="all" players={allPlayers} title="All Players" />
            <PlayerList listType="favorites" players={favoritePlayers} title="Favorite Players" />
        </div>
    )
}
