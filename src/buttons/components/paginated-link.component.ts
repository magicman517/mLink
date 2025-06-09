import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ContainerBuilder,
  TextDisplayBuilder,
} from 'discord.js';
import { Types } from 'mongoose';
import { PaginatedResponse } from 'src/types/paginated-links.type';

export class PaginatedLinkComponents {
  public static data(link: PaginatedResponse) {
    return [
      new ContainerBuilder().addTextDisplayComponents(
        this.id(link.data[0]._id),
      ),
      new ContainerBuilder().addTextDisplayComponents(
        this.code(link.data[0].code),
        this.title(link.data[0].title),
        this.longUrl(link.data[0].longUrl),
        this.isActive(link.data[0].isActive),
        this.accessCount(link.data[0].accessCount),
      ),
    ];
  }

  public static buttons(
    links: PaginatedResponse,
  ): ActionRowBuilder<ButtonBuilder> {
    const prevPage = links.page - 1;
    const nextPage = links.page + 1;

    const updateButton = links.data[0].isActive
      ? new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId(
            `links/disable/${links.data[0]._id.toString()}/page/${links.page}`,
          )
          .setLabel('Disable')
          .setDisabled(false)
      : new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId(
            `links/enable/${links.data[0]._id.toString()}/page/${links.page}`,
          )
          .setLabel('Enable')
          .setDisabled(false);

    return new ActionRowBuilder<ButtonBuilder>().addComponents(
      updateButton,
      new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setCustomId(`links/delete/${links.data[0]._id.toString()}`)
        .setLabel('Delete')
        .setDisabled(false),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`links/page/${prevPage}`)
        .setLabel('Prev page')
        .setDisabled(!links.hasPrevPage),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`links/page/${nextPage}`)
        .setLabel('Next page')
        .setDisabled(!links.hasNextPage),
    );
  }

  public static id(id: Types.ObjectId): TextDisplayBuilder {
    return new TextDisplayBuilder({
      content: `Id: \`${id.toString()}\``,
    });
  }

  public static code(code: string): TextDisplayBuilder {
    return new TextDisplayBuilder({
      content: `Code: \`${code}\``,
    });
  }

  public static title(title: string | null): TextDisplayBuilder {
    return new TextDisplayBuilder({
      content: `Title: \`${title}\``,
    });
  }

  public static longUrl(longUrl: string): TextDisplayBuilder {
    return new TextDisplayBuilder({
      content: `Long URL: \`${longUrl.slice(0, 30)}...\``,
    });
  }

  public static isActive(isActive: boolean): TextDisplayBuilder {
    return new TextDisplayBuilder({
      content: `Is active: \`${isActive}\``,
    });
  }

  public static accessCount(accessCount: number): TextDisplayBuilder {
    return new TextDisplayBuilder({
      content: `Access count: \`${accessCount}\``,
    });
  }
}
