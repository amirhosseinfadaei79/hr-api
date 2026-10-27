import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user-entity.js";
import type { Relation } from "typeorm"; 

@Entity('refresh_token')
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tokenHash: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, user => user.refreshTokens)
    user: Relation<User>

    @Column({ type: 'timestamp', nullable: true })
    revokedAt: Date | null
}
