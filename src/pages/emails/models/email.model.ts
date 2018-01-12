export interface User {
    displayName: string;
    email: string;
}

export interface Email {
    uid: string;
    subject: string;
    date: any;
    message: any;
    unformattedMessage: string;
    from: User;
    to: User;
    isImportant: boolean;
    isDeleted: boolean;
}

export interface ComposeEmail {
    email: Email;
    videos: File[];
}
