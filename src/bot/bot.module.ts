import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { NecordModule } from 'necord';
import { ConfigService } from '@nestjs/config';
import { NecordPaginationModule } from '@necord/pagination';

@Module({
  imports: [
    NecordModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('discord.bot_token')!,
        intents: [],
      }),
      inject: [ConfigService],
    }),
    NecordPaginationModule.forRoot({
      allowSkip: true,
      allowTraversal: true,
      buttonsPosition: 'end',
    }),
  ],
  providers: [BotService],
})
export class BotModule {}
