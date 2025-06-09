import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Link, LinkSchema } from './link.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Link.name,
        schema: LinkSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class SchemasModule {}
