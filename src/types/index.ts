export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    roles: string;
    token: string
}

export interface IFixture {
    home_team: string;
    away_team: string;
    status: string;
    match_link: string;
}

export interface ITeam {
    name: string;
    description: string;
    size: number;
    coach: string;
}
