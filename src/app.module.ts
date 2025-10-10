import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Book } from './books/book.entity';
import { Librarian } from './librarian/librariran.entity';
import { Loan } from './loan/loan.entity';
import { Reservation } from './reservation/reservation.entity';
import { BookConditionHistory } from './book-condition-history/book-condition-history.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [
          User,
          Book,
          Librarian,
          Loan,
          Reservation,
          BookConditionHistory,
        ],
        synchronize: true,
      }),
    }),

    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
