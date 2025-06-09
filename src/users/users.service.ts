import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }

  public async findById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id);
  }

  public async create(id: string): Promise<UserDocument> {
    const users = await this.findAll();
    if (users.find((user) => user._id === id)) {
      throw new ConflictException(`User with id \`${id}\` already exists`);
    }

    const isFirstUser = users.length === 0;
    const roles = isFirstUser ? ['user', 'admin'] : ['user'];

    const user = await new this.userModel({
      _id: id,
      roles: roles,
    }).save();

    this.logger.log(
      `Created user ${user._id} with roles [${user.roles.join(', ')}]`,
    );

    return user;
  }
}
