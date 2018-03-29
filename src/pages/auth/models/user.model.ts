export interface Authenticate {
    email: string;
    password: string;
}

export interface UserSignUp {
    email: string;
    password: string;
    confirmPassword: string;
    displayName: string;
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
}
