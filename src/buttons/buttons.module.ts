import { Module } from '@nestjs/common';
import { LinksPageButton } from './buttons/links-page.button';
import { SchemasModule } from 'src/schemas/schemas.module';
import { LinksService } from 'src/links/links.service';
import { LinksDeleteButton } from './buttons/links-delete.button';
import { LinksDisableButton } from './buttons/links-disable.button';
import { LinksEnableButton } from './buttons/link-enable.button';

@Module({
  imports: [SchemasModule],
  providers: [
    LinksPageButton,
    LinksDeleteButton,
    LinksDisableButton,
    LinksEnableButton,
    LinksService,
  ],
})
export class ButtonsModule {}
