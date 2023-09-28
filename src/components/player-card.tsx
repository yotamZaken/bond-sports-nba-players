import React from "react";
import { usePlayerContext } from "../player-context";
import { Player } from "../types";

export default function PlayerCard({ player }: { player: Player }) {
    const { modalOpen, setModalOpen } = usePlayerContext();

    let playerHeight : string = "";
    if (player.height_feet && player.height_inches) {
        playerHeight = `${player.height_feet}.${player.height_inches}"`;
    }

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${modalOpen ? "" : "hidden"}`}>
            <div className="grid grid-flow-row bg-white w-80 p-4 rounded-lg shadow-lg gap-3 justify-items-start">
                <p>Name: <span className="font-bold">{player.first_name} {player.last_name}</span></p>
                <p>Team: <span className="font-bold">{player.team.full_name}</span></p>
                {player.position && <p>Position: <span className="font-bold">{player.position}</span></p> }
                {playerHeight && <p>Height: {playerHeight}</p>}
                <button onClick={() => setModalOpen(false)} className="border border-1 justify-self-end p-1 rounded bg-sky-300">Close</button>
            </div>
            <div
                className="fixed top-0 left-0 w-full h-full bg-gray-500 opacity-50"
                onClick={() => setModalOpen(false)}
            ></div>
        </div>
    );
};
