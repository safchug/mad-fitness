import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UsersEntity } from '../../users/entity/users.entity';
import { InvitesEntity } from '../../invites/entity/invites.entity'

Entity()
export class UsersInvitesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UsersEntity)
    @JoinColumn({ name: "user_id" })
    userId: number;

    @ManyToOne(() => InvitesEntity)
    @JoinColumn({ name: "invite_id" })
    inviteId: number;

    @CreateDateColumn({type: "timestamp", name: "created_at", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", name: "updated_at", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}    