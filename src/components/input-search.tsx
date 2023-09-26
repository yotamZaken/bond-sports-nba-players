import { usePlayerContext } from "../player-context";
import clsx from "clsx";

export default function InputSearch({ listType }: { listType: string; }) {
    const { searchText, setSearchText } = usePlayerContext();
    return (
        <input
            type="text"
            placeholder="Search for a player..."
            value={ searchText }
            onChange={ (e) => setSearchText(e.target.value) }
            className={clsx("p-3", listType === "favorites" && "invisible")}
        />
    )
}
