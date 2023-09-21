import { Player } from "../types";
import TrashOutlineIcon from "../icons/trash-outline.svg";

import clsx from "clsx";
import { capitalize, find } from "lodash";
import { usePlayerContext } from "../player-context";

type PlayerItemProps = {
    player: Player;
    listType: "all" | "favorites";
}
export default function PlayerItem({ player, listType }: PlayerItemProps) {
    const { toggleFavorite, favoritePlayers } = usePlayerContext();

    const alreadyFavorite = find(favoritePlayers, (currPlayer) => { return player.id === currPlayer.id });

    const handleFavClick = () => {
        toggleFavorite(player);
    }

    return (
        <div className="grid grid-cols-2 gap-3 place-items-center">
            <p>{capitalize(player.first_name)} {capitalize(player.last_name)}</p>
            <div className="h-5 w-5" onClick={handleFavClick}>
                { listType === "all" ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={clsx("w-6 h-6", alreadyFavorite && listType === "all" && "fill-amber-400")} >
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg> : <img className="" src={TrashOutlineIcon} alt="toggle-favorite"/> }
            </div>
        </div>
    )
};
