import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UsersEntity } from '../../users/entity/users.entity';
import { SheduleEntity } from '../../shedule/entity/shedule.entity'


Entity()
export class SheduleUsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UsersEntity)
    @JoinColumn({ name: "user_id" })
    userId: number;

    @ManyToOne(() => SheduleEntity)
    @JoinColumn({ name: "shedule_id" })
    sheduleId: number;

    @CreateDateColumn({type: "timestamp", name: "created_at", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", name: "updated_at", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}    