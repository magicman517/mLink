import { Injectable, NotFoundException } from '@nestjs/common';
import { Button, Context, ButtonContext, ComponentParam } from 'necord';
import { LinksService } from 'src/links/links.service';
import { PaginatedLinkComponents } from '../components/paginated-link.component';

@Injectable()
export class LinksDisableButton {
  constructor(private readonly linksService: LinksService) {}

  @Button('links/disable/:id/page/:page')
  async onButton(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('id') id: string,
    @ComponentParam('page') page: string,
  ) {
    const updateResult = await this.linksService.disable(id);
    if (updateResult.modifiedCount === 0) {
      throw new NotFoundException('Link not found');
    }

    const links = await this.linksService.findByUserIdPaginated(
      interaction.user.id,
      Number.parseInt(page),
      1,
    );

    if (links.total === 0 || !links.data.length) {
      throw new NotFoundException('No links found');
    }

    await interaction.update({
      components: [
        ...PaginatedLinkComponents.data(links),
        PaginatedLinkComponents.buttons(links),
      ],
      flags: ['IsComponentsV2'],
    });
  }
}
