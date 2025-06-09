import { Module } from '@nestjs/common';
import { NewLinkModal } from './new-link.modal';
import { SchemasModule } from 'src/schemas/schemas.module';
import { LinksService } from 'src/links/links.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [SchemasModule],
  providers: [NewLinkModal, LinksService, UsersService],
  exports: [NewLinkModal],
})
export class ModalsModule {}
