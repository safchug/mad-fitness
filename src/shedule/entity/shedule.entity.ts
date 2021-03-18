import { Column, CreateDateColumn, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from '';
import ClassEntity from "../../classes/entity/class.entity";

class SheduleEntity {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  trener: User;

  @OneToOne(() => ClassEntity, classEntity => classEntity.id)
  @JoinColumn()
  class: ClassEntity;

  @Column({name: 'description'})
  description: string;

  @Column({name: 'location'})
  location: string;
)
  @CreateDateColumn({name: "start_date", type: "timestamp"})
  startDate: Date;

  @Column({name: "end_date", type: "timestamp"})
  endDate: Date;

  @CreateDateColumn({name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}

export default SheduleEntity;