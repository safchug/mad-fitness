import { User } from '../../users/interface/users.interface';

export interface ISearchParams {
  trainer?: User;
  fromDate?: Date;
  untilDate?: Date;
  byTime?: Date;
  sortBy?: string;
  sort?: string;
}
