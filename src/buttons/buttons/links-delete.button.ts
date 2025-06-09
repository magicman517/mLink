import { Injectable, NotFoundException } from '@nestjs/common';
import { Button, Context, ButtonContext, ComponentParam } from 'necord';
import { LinksService } from 'src/links/links.service';
import { PaginatedLinkComponents } from '../components/paginated-link.component';
import { ContainerBuilder, TextDisplayBuilder } from 'discord.js';

@Injectable()
export class LinksDeleteButton {
  constructor(private readonly linksService: LinksService) {}

  @Button('links/delete/:id')
  async onButton(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('id') id: string,
  ) {
    const updateResult = await this.linksService.delete(id);
    if (updateResult.deletedCount === 0) {
      throw new NotFoundException('Link not found or already deleted');
    }

    const links = await this.linksService.findByUserIdPaginated(
      interaction.user.id,
      1,
      1,
    );

    if (links.total === 0 || !links.data.length) {
      throw new NotFoundException('No links found');
    }

    await interaction.update({
      components: [
        new ContainerBuilder().addTextDisplayComponents(
          new TextDisplayBuilder({
            content: `✅ Deleted \`${id}\``,
          }),
        ),
        ...PaginatedLinkComponents.data(links),
        PaginatedLinkComponents.buttons(links),
      ],
      flags: ['IsComponentsV2'],
    });
  }
}
