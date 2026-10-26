import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../../shared/enums/user-role.enum.js";
import { RefreshToken } from "./refresh-token.entity.js";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    mobile: string

    @Column()
    password: string // hashed

    @Column({ type: 'enum', enum: Role, default: Role.EMPLOYEE })
    role: Role

    @OneToMany(()=> RefreshToken, rt=> rt.user)
    refreshTokens: RefreshToken[]
}