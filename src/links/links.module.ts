import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { SchemasModule } from 'src/schemas/schemas.module';

@Module({
  imports: [SchemasModule],
  providers: [LinksService],
  exports: [LinksService],
})
export class LinksModule {}
