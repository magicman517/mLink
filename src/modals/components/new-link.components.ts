import { ActionRowBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export class NewLinkComponents {
  public static readonly code =
    new ActionRowBuilder<TextInputBuilder>().addComponents([
      new TextInputBuilder()
        .setCustomId('new-link-code')
        .setLabel('Code')
        .setStyle(TextInputStyle.Short)
        .setRequired(false)
        .setMinLength(2)
        .setMaxLength(32),
    ]);

  public static readonly title =
    new ActionRowBuilder<TextInputBuilder>().addComponents([
      new TextInputBuilder()
        .setCustomId('new-link-title')
        .setLabel('Title')
        .setStyle(TextInputStyle.Short)
        .setRequired(false)
        .setMinLength(0)
        .setMaxLength(64),
    ]);

  public static readonly longUrl =
    new ActionRowBuilder<TextInputBuilder>().addComponents([
      new TextInputBuilder()
        .setCustomId('new-link-long-url')
        .setLabel('Long URL')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder('https://google.com'),
    ]);
}
