import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SchemasModule } from 'src/schemas/schemas.module';

@Module({
  imports: [SchemasModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
