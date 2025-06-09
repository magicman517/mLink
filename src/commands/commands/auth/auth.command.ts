import { Injectable } from '@nestjs/common';
import { ContainerBuilder, TextDisplayBuilder } from 'discord.js';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthCommand {
  constructor(private readonly usersService: UsersService) {}

  @SlashCommand({
    name: 'auth',
    description: 'Use me to start using mLink',
  })
  public async onAuth(@Context() [interaction]: SlashCommandContext) {
    const user = await this.usersService.create(interaction.user.id);

    await interaction.reply({
      components: [
        new ContainerBuilder().addTextDisplayComponents(
          new TextDisplayBuilder({
            content: '✅ You are now authorized',
          }),
        ),
        new ContainerBuilder().addTextDisplayComponents(
          new TextDisplayBuilder({
            content: `Id\n\`${user._id}\``,
          }),
          new TextDisplayBuilder({
            content: `Roles\n\`${user.roles.map((role) => role.charAt(0).toUpperCase() + role.slice(1)).join(', ')}\``,
          }),
        ),
      ],
      flags: ['Ephemeral', 'IsComponentsV2'],
    });
  }
}
