import { Module } from '@nestjs/common';
import { AuthCommand } from './commands/auth/auth.command';
import { SchemasModule } from 'src/schemas/schemas.module';
import { UsersService } from 'src/users/users.service';
import { LinkCommand } from './commands/link/link.command';
import { LinksService } from 'src/links/links.service';

@Module({
  imports: [SchemasModule],
  providers: [AuthCommand, LinkCommand, UsersService, LinksService],
})
export class CommandsModule {}
