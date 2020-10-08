import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { SqlException } from 'src/features/exceptions/sql.exception';
import { Repository } from 'typeorm';

@Injectable()
export class AdminRepo {
  constructor(
    @InjectRepository(Admin) private readonly db: Repository<Admin>,
  ) {}

  async insert(admin: Admin): Promise<Admin> {
    try {
      const insertResult = await this.db.insert(admin);
      admin.id = insertResult.identifiers[0].id;
      return admin;
    } catch (e) {
      throw new SqlException(e);
    }
  }

  async loginWithUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<Admin> {
    try {
      const admin = await this.db.findOne({
        where: {
          username,
          password,
        },
      });
      return admin;
    } catch (e) {
      throw new SqlException(e);
    }
  }
}
