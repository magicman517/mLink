import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type LinkDocument = HydratedDocument<Link>;

@Schema({
  timestamps: true,
})
export class Link {
  @Prop({ required: true, type: String, ref: 'User' })
  owner: User;

  @Prop({ required: false, default: null, type: String })
  title: string | null;

  @Prop({ required: true, minlength: 2, maxlength: 32, unique: true })
  code: string;

  @Prop({ required: true })
  longUrl: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: 0 })
  accessCount: number;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
