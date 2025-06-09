import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import {
  BaseInteraction,
  ContainerBuilder,
  TextDisplayBuilder,
} from 'discord.js';
import { NecordArgumentsHost } from 'necord';

@Catch()
export class NecordExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(NecordExceptionFilter.name);

  public async catch(exception: Error, host: ArgumentsHost) {
    try {
      const [interaction] = NecordArgumentsHost.create(host).getContext();

      if (
        interaction &&
        interaction instanceof BaseInteraction &&
        interaction.isRepliable()
      ) {
        return await interaction.reply({
          components: [
            new ContainerBuilder().addTextDisplayComponents(
              new TextDisplayBuilder({
                content: `⚠️ ${exception.message}`,
              }),
            ),
          ],
          flags: ['Ephemeral', 'IsComponentsV2'],
        });
      }
    } catch {
      this.logger.debug(
        'Error while handling exception in NecordExceptionFilter. Interaction not available in controller context',
      );
    }
  }
}
