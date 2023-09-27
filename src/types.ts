export type Player = {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    height_feet: number;
    height_inches: number;
    weight_pounds: number;
    team:{
        id: number;
        abbreviation: string;
        city: string;
        conference: string;
        division: string;
        full_name: string;
        name: string;
    }
}

export type Players = Array<Player>;
