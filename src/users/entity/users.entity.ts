import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RolesEntity } from '../../roles/entity/roles.entity';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstname: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @ManyToOne(() => RolesEntity)
  @JoinColumn({ name: 'role_id' })
  roleId: number;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastname: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

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
