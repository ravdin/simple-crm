import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserNote } from "./UserNote";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    phoneNumber: string;

    @OneToMany(() => UserNote, (userNote) => userNote.user, {eager: true})
    notes: UserNote[];
}
