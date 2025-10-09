import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibrarianModule } from './librarian/librarian.module';
import { ReservationModule } from './reservation/reservation.module';
import { BookConditionHistoryModule } from './book-condition-history/book-condition-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: parseInt(configService.get<string>('DB_PORT') || '5432'),
        username: configService.get<string>('DB_USERNAME') || 'admin',
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE') || 'biblioteka',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    LibrarianModule,
    ReservationModule,
    BookConditionHistoryModule,
    // Ovde dodajte vaše druge module (BooksModule, UserModule...)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
