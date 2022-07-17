export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    roles: {
        type: string;
        enum: string[]
    };
}