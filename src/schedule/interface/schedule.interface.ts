import { User } from '../../users/interface/users.interface';
import { Class } from '../../classes/interface/classes.interface';

export interface Schedule {
  id?: number;
  description: string;
  class: Class;
  trainer: User;
  location: string;
  startDate: Date;
  endDate: Date;
}
