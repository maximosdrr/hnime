import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserRepo } from './repositories/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

  insert(admin: User): Promise<User> {
    return this.userRepo.insert(admin);
  }

  login(username: string, password: string): Promise<User> {
    return this.userRepo.loginWithUsernameAndPassword(username, password);
  }
}
