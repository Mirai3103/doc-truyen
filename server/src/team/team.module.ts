import { TeamService } from './team.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CommonModule } from '../common/common.module';
import { TeamResolver } from './team.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './schema/team.schema';
import { User, UserSchema } from '@/user/schema/user.schema';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    CommonModule,
    MongooseModule.forFeature([
      {
        name: Team.name,
        schema: TeamSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    UserModule,
  ],
  providers: [TeamService, TeamResolver],
})
export class TeamModule {}
