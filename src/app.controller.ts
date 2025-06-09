import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Redirect,
} from '@nestjs/common';
import { LinksService } from './links/links.service';
import { IsNotEmpty, IsString } from 'class-validator';

class GetLinkByCodeDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly linksService: LinksService) {}

  @Get(':code')
  @Redirect()
  async getRedirect(@Param() getLinkByCodeDto: GetLinkByCodeDto) {
    const link = await this.linksService.findByCode(getLinkByCodeDto.code);

    if (!link || !link.isActive) {
      throw new NotFoundException();
    }

    this.linksService
      .addAccessCount(link._id.toString())
      .then(() =>
        this.logger.debug(`Added access count to link ${link._id.toString()}`),
      )
      .catch((err) => this.logger.error(err));

    return {
      url: link.longUrl,
    };
  }
}
