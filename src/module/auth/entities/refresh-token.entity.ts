import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user-entity.js";

@Entity('refresh_token')
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tokenHash: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, user => user.refreshTokens)
    user: User 

    @Column({ type: 'timestamp', nullable: true })
    revokedAt: Date | null
}
