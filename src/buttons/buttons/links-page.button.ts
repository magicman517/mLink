import { Injectable, NotFoundException } from '@nestjs/common';
import { Button, Context, ButtonContext, ComponentParam } from 'necord';
import { LinksService } from 'src/links/links.service';
import { PaginatedLinkComponents } from '../components/paginated-link.component';

@Injectable()
export class LinksPageButton {
  constructor(private readonly linksService: LinksService) {}

  @Button('links/page/:page')
  async onButton(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('page') page: string,
  ) {
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
