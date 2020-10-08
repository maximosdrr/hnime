import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { SqlException } from 'src/features/exceptions/sql.exception';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepo {
  constructor(@InjectRepository(User) private readonly db: Repository<User>) {}

  async insert(user: User): Promise<User> {
    try {
      const insertResult = await this.db.insert(user);
      user.id = insertResult.identifiers[0].id;
      return user;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async loginWithUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User> {
    try {
      const user = await this.db.findOne({
        where: {
          username,
          password,
        },
      });
      return user;
    } catch (e) {
      throw new SqlException(e);
    }
  }
}
