import { Injectable, Logger } from '@nestjs/common';
import { Context, ContextOf, On, Once } from 'necord';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  @Once('ready')
  public onReady(@Context() [client]: ContextOf<'ready'>): void {
    this.logger.log(`Logged in as ${client.user.username}`);
  }

  @On('warn')
  public onWarn(@Context() [warning]: ContextOf<'warn'>): void {
    this.logger.warn(`Warning: ${warning}`);
  }

  @On('error')
  public onError(@Context() [error]: ContextOf<'error'>): void {
    this.logger.error(`Error: ${error}`);
  }
}
