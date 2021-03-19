import {
   Column,
   CreateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'class_entity' })
export class ClassEntity {
   @PrimaryGeneratedColumn({ name: 'id' })
   id: number;

   @Column({ name: 'label' })
   label: string;

   @Column({ name: 'description' })
   description: string;

   @Column({ name: 'max_person' })
   max: number;

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
