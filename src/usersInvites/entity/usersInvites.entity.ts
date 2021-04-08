import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { InvitesEntity } from '../../invites/entity/invites.entity';
import { User } from '../../users/interface/users.interface';

@Entity({ name: 'users_invites' })
export class UsersInvitesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => InvitesEntity, (invite) => invite.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'invite_id' })
  invite: InvitesEntity;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
