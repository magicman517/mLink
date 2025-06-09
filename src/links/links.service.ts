import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, UpdateResult } from 'mongoose';
import { Link, LinkDocument } from 'src/schemas/link.schema';
import { CreateLinkDto } from './dto/create-link.dto';
import { PaginatedResponse } from 'src/types/paginated-links.type';

@Injectable()
export class LinksService {
  private readonly logger = new Logger(LinksService.name);
  private readonly CHARSET =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  constructor(
    @InjectModel(Link.name) private readonly linkModel: Model<Link>,
  ) {}

  public async findAll(): Promise<LinkDocument[]> {
    return await this.linkModel.find();
  }

  public async findById(id: string): Promise<LinkDocument | null> {
    return await this.linkModel.findById(id);
  }

  public async findByCode(code: string): Promise<LinkDocument | null> {
    return await this.linkModel.findOne({ code });
  }

  public async findByUserId(userId: string): Promise<LinkDocument[] | null> {
    return await this.linkModel.find({
      owner: userId,
    });
  }

  public async findByUserIdPaginated(
    userId: string,
    page: number = 1,
    limit: number = 1,
  ): Promise<PaginatedResponse> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.linkModel
        .find({ owner: userId })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.linkModel.countDocuments({ owner: userId }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }

  public async create(createLinkDto: CreateLinkDto): Promise<LinkDocument> {
    const link = await new this.linkModel({
      owner: createLinkDto.userId,
      title: createLinkDto.title,
      code: createLinkDto.code,
      longUrl: createLinkDto.longUrl,
    }).save();

    this.logger.log(`Created link ${link._id.toString()}`);

    return link;
  }

  public async enable(id: string): Promise<UpdateResult> {
    this.logger.debug(`Enabling link ${id}`);
    return await this.linkModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          isActive: true,
        },
      },
    );
  }

  public async disable(id: string): Promise<UpdateResult> {
    this.logger.debug(`Disabling link ${id}`);
    return await this.linkModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          isActive: false,
        },
      },
    );
  }

  public async delete(id: string): Promise<DeleteResult> {
    this.logger.log(`Deleting link ${id}`);
    return await this.linkModel.deleteOne({
      _id: id,
    });
  }

  public async addAccessCount(id: string) {
    this.logger.debug(`Adding access count to link ${id}`);
    await this.linkModel.updateOne(
      {
        _id: id,
      },
      {
        $inc: {
          accessCount: 1,
        },
      },
    );
  }

  public async generateUniqueCode(): Promise<string> {
    let code: string;
    let isUnique: boolean;

    do {
      code = '';
      for (let i = 0; i < 6; i++) {
        code += this.CHARSET.charAt(
          Math.floor(Math.random() * this.CHARSET.length),
        );
      }
      isUnique = !(await this.findByCode(code));
    } while (!isUnique);

    return code;
  }
}
