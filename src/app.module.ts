import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '0103',
    database: 'moviedb3',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([{ name: 'USER_MICROSERVICE', transport: Transport.TCP }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
