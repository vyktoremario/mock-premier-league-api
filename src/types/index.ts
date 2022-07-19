export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
  role: string;
}

export interface IFixture {
  home_team: string;
  away_team: string;
  match_link: string;
  match_date: string;
  fixture: string;
}

export interface ITeam {
  full_name: string;
  short_name: string;
  size: number;
  coach: string;
}
