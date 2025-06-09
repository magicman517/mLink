import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ModalBuilder } from 'discord.js';
import { Context, SlashCommandContext, Subcommand } from 'necord';
import { PaginatedLinkComponents } from 'src/buttons/components/paginated-link.component';
import { LinksCommandGroup } from 'src/commands/decorators/links-group.decorator';
import { LinksService } from 'src/links/links.service';
import { NewLinkComponents } from 'src/modals/components/new-link.components';
import { UsersService } from 'src/users/users.service';

@Injectable()
@LinksCommandGroup()
export class LinkCommand {
  private readonly logger = new Logger(LinkCommand.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly linksService: LinksService,
  ) {}

  @Subcommand({
    name: 'add',
    description: 'Add a new link',
  })
  public async onAdd(@Context() [interaction]: SlashCommandContext) {
    await interaction.showModal(
      new ModalBuilder()
        .setTitle('New Link')
        .setCustomId(`new-link`)
        .setComponents([
          NewLinkComponents.code,
          NewLinkComponents.title,
          NewLinkComponents.longUrl,
        ]),
    );
  }

  @Subcommand({
    name: 'list',
    description: 'List all your link',
  })
  public async onList(@Context() [interaction]: SlashCommandContext) {
    const links = await this.linksService.findByUserIdPaginated(
      interaction.user.id,
    );

    if (links.total === 0 || !links.data.length) {
      throw new NotFoundException('No links found');
    }

    await interaction.reply({
      components: [
        ...PaginatedLinkComponents.data(links),
        PaginatedLinkComponents.buttons(links),
      ],
      flags: ['Ephemeral', 'IsComponentsV2'],
    });
  }
}
