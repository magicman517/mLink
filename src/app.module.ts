import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { DatabaseModule } from './database/database.module';
import { SchemasModule } from './schemas/schemas.module';
import { UsersModule } from './users/users.module';
import { CommandsModule } from './commands/commands.module';
import { LinksModule } from './links/links.module';
import { ModalsModule } from './modals/modals.module';
import { ButtonsModule } from './buttons/buttons.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    BotModule,
    DatabaseModule,
    SchemasModule,
    UsersModule,
    CommandsModule,
    LinksModule,
    ModalsModule,
    ButtonsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
