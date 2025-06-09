import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { StringOption } from 'necord';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsUrl()
  @StringOption({
    name: 'long-url',
    description: 'The long URL to shorten',
    required: true,
  })
  longUrl: string;

  @IsOptional()
  @IsString()
  @StringOption({
    name: 'title',
    description: 'Title of the link',
    required: false,
  })
  title: string | null;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  @StringOption({
    name: 'code',
    description: 'Custom code for the link',
    required: false,
    min_length: 2,
    max_length: 32,
  })
  code: string | null;
}
