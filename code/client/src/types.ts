export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    phoneNumber: string;
    notes: UserNote[];
}

export interface UserNote {
    user: User;
    note: string;
    createdAt: Date;
    updatedAt: Date;
}