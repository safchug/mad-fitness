import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated} from "typeorm";

@Entity()
export class InvitesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    invite: string;

    @CreateDateColumn({type: "timestamp", name: "created_at", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", name: "updated_at", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @CreateDateColumn({type: "timestamp", name: "expires_at", default: () => "DATE_ADD(NOW(), INTERVAL 2 HOUR)"})
    expiresAt: Date;
}