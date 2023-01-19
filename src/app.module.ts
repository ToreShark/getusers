import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DocsModule } from './docs/docs.module';
import { User } from './users/user.entity';
import { DocEntity } from './docs/doc.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'top-api',
      entities: [User, DocEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    DocsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
