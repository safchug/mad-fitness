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
import { ClassEntity } from '../../classes/entity/class.entity';

@Entity()
export class ScheduleEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => UsersEntity, (userEntity) => userEntity.id)
  trainer: UsersEntity;

  @ManyToOne(() => ClassEntity, (classEntity) => classEntity.id)
  class: ClassEntity;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'location' })
  location: string;

  @CreateDateColumn({ name: 'start_date', type: 'timestamp' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp' })
  endDate: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
