import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { ScheduleEntity } from '../../schedule/entity/schedule.entity';

@Entity()
export class ScheduleUsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => ScheduleEntity)
  @JoinColumn({ name: 'schedule_id' })
  scheduleId: number;

  @CreateDateColumn({
    nullable: true,
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    name: 'updated_at',
  })
  updatedAt: Date;
}
