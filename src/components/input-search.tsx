import { usePlayerContext } from "../player-context";

export default function InputSearch({ isFavoritesList }: { isFavoritesList: boolean; }) {
    const { searchText, setSearchText } = usePlayerContext();
    return (
        <input
            type="text"
            placeholder="Search for a player..."
            value={ searchText }
            onChange={ (e) => setSearchText(e.target.value) }
            className="justify-items-start p-2 border border-1 rounded"
        />
    )
}
