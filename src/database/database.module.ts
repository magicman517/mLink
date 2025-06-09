import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.connection_string')!,
        onConnectionCreate: (connection) => {
          connection.on('connected', () => {
            Logger.log('Database connection established', 'DatabaseModule');
          });
          connection.on('open', () =>
            Logger.log('Database connection opened', 'DatabaseModule'),
          );
          connection.on('disconnected', () =>
            Logger.warn('Database disconnected', 'DatabaseModule'),
          );
          connection.on('reconnected', () =>
            Logger.log('Database reconnected', 'DatabaseModule'),
          );

          return connection;
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
