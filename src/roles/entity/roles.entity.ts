import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  role: string;

  @CreateDateColumn({
    nullable: true,
    name: 'created_at',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    name: 'updated_at',
    select: false,
  })
  updatedAt: Date;
}
