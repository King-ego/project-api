export interface IRequestCreateUser {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface IRequestCreateUserWithoutPassword {
    name: string;
    email: string;
    password: string;
}