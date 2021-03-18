import { Column, CreateDateColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from '';
import ClassEntity from "../../classes/enteties/class.entity";

class SheduleEntity {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @OneToOne(() => User, user => user.id)
  trener: User;

  @OneToOne(() => ClassEntity, classEntity => classEntity.id)
  class: ClassEntity;

  @Column({name: 'description'})
  description: string;

  @Column({name: 'location'})
  location: string;
)
  @CreateDateColumn({name: "start_date", type: "timestamp"})
  startDate: Date;

  @CreateDateColumn({name: "end_date", type: "timestamp"})
  endDate: Date;

  @CreateDateColumn({name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}

export default SheduleEntity;