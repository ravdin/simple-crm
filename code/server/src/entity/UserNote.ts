import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class UserNote {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.notes)
    user: User;

    @Column()
    note: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
