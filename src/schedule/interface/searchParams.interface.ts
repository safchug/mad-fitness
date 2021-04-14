import { User } from '../../users/interface/users.interface';

export interface ISearchParams {
  trainer?: User;
  byDate?: Date;
  byTime?: Date;
}
