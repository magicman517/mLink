import { plainToClass } from 'class-transformer';
import { Injectable, Logger } from '@nestjs/common';
import { ContainerBuilder, TextDisplayBuilder } from 'discord.js';
import { Ctx, Modal, ModalContext } from 'necord';
import { CreateLinkDto } from 'src/links/dto/create-link.dto';
import { LinksService } from 'src/links/links.service';

@Injectable()
export class NewLinkModal {
  private readonly logger = new Logger(NewLinkModal.name);

  constructor(private readonly linksService: LinksService) {}

  @Modal('new-link')
  public async onModal(@Ctx() [interaction]: ModalContext) {
    let code = interaction.fields.getTextInputValue('new-link-code');

    const title = interaction.fields.getTextInputValue('new-link-title');
    const longUrl = interaction.fields.getTextInputValue('new-link-long-url');

    if (!this._isValidUrl(longUrl)) {
      throw new Error('Invalid URL format');
    }

    if (code.length) {
      code = code.trim();
      const existingCode = await this.linksService.findByCode(code);
      if (existingCode) {
        throw new Error(`Code \`${code}\` already exists`);
      }
    } else {
      code = await this.linksService.generateUniqueCode();
    }

    const createLinkDto = plainToClass(CreateLinkDto, {
      userId: interaction.user.id,
      title: title.length ? title : null,
      code,
      longUrl,
    });

    const newLink = await this.linksService.create(createLinkDto);

    await interaction.reply({
      components: [
        new ContainerBuilder().addTextDisplayComponents(
          new TextDisplayBuilder({
            content: '✅ New link created',
          }),
        ),
        new ContainerBuilder().addTextDisplayComponents(
          new TextDisplayBuilder({
            content: `Id:\n\`${newLink._id.toString()}\``,
          }),
          new TextDisplayBuilder({
            content: `Code:\n\`${newLink.code}\``,
          }),
          new TextDisplayBuilder({
            content: `Title:\n\`${newLink.title}\``,
          }),
          new TextDisplayBuilder({
            content: `Long URL:\n\`${newLink.longUrl}\``,
          }),
        ),
      ],
      flags: ['Ephemeral', 'IsComponentsV2'],
    });
  }

  private _isValidUrl(url: string): boolean {
    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

    return urlPattern.test(url);
  }
}
