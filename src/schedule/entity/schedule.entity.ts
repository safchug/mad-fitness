import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { ClassesEntity } from '../../classes/entity/classes.entity';
import { User } from '../../users/interface/users.interface';
import { Class } from '../../classes/interface/classes.interface';

@Entity({ name: 'schedule' })
export class ScheduleEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'trainer_id' })
  trainer: User;

  @ManyToOne(() => ClassesEntity)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'location' })
  location: string;

  @CreateDateColumn({ name: 'start_date', type: 'timestamp' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp' })
  endDate: Date;

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
