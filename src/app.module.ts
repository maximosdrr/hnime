import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeModule } from './modules/anime/anime.module';
import { EpisodeModule } from './modules/episode/episode.module';
import { MovieModule } from './modules/movie/movie.module';
import { CategoryModule } from './modules/category/category.module';
import { AdminAuthModule } from './modules/admin-auth/admin-auth.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [process.env.DATABASE_ENTITIES],
      synchronize: process.env.DATABASE_SYNCHRONIZE == 'true' ? true : false,
    }),
    AnimeModule,
    EpisodeModule,
    MovieModule,
    CategoryModule,
    AdminAuthModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
