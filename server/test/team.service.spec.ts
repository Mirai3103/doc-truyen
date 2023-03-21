import { TeamService } from '../src/team/team.service';
import { UserService } from '@/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '@/user/schema/user.schema';
import { Team } from '@/team/schema/team.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { UtilService } from '@/common/util.service';
import assert from 'assert';
describe('TeamService', () => {
  let teamService: TeamService;
  let userService: UserService;
  let userModal: Model<User>;
  let teamModal: Model<Team>;
  let module: TestingModule;
  let utilService: UtilService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    teamModal = module.get(getModelToken(Team.name));
    userModal = module.get(getModelToken(User.name));
    teamService = module.get(TeamService);
    userService = module.get(UserService);
    utilService = module.get(UtilService);
    await teamModal.deleteMany({});
    await userModal.deleteMany({});
    await addFakeData(userService, teamService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('test teamservice', () => {
    it('count should be 3', async () => {
      const count = await userModal.countDocuments();
      expect(count).toBe(3);
    });
    it('register team', async () => {
      let user = await userService.findByUniqueField('huuhoang@gmail.com');
      expect(user).toBeInstanceOf(Object);
      let team = await teamService.create({
        createdBy: user!._id + '',
        description: 'test',
        name: 'tên nè ba',
      });
      team = (await teamService.findOne(team._id + ''))!;
      expect(team.createdBy).toStrictEqual(user!._id);
      expect(team.slug).toStrictEqual(utilService.slugfy('tên nè ba'));
      expect(team.members).toContainEqual(user!._id);
      user = await userService.findByUniqueField('huuhoang@gmail.com');
      expect(user!.teams).toContainEqual(team._id);
      assert.equal(team.members.length, 1);
    });
    it('add member', async () => {
      const count = await userModal.countDocuments();
      expect(count).toBe(3);
      const member = await userService.findByUniqueField('1243@gmail.com');
      expect(member).toBeTruthy();
      const team = await teamService.findBySlug('ten-ne');
      expect(team).toBeTruthy();
      expect(
        await teamService.addUserToTeam(
          member!._id + '',
          team!._id + '',
          team!.createdBy._id + '',
        ),
      ).toBeTruthy();
      const otherMenber = await userService.findByUniqueField('123@gmail.com');
      expect(
        await teamService.addUserToTeam(
          otherMenber!._id + '',
          team!._id + '',
          member!._id + '',
        ),
      ).toBeFalsy();
      expect(
        await teamService.addUserToTeam(
          otherMenber!._id + '',
          team!._id + '',
          team!.createdBy._id + '',
        ),
      ).toBeTruthy();
      expect(
        await teamService.addUserToTeam(
          otherMenber!._id + '',
          team!._id + '',
          team!.createdBy._id + '',
        ),
      ).toBeFalsy();
      const teamInDb = await teamService.findBySlug('ten-ne');
      expect(teamInDb!.members).toContainEqual(member!._id);
      expect(teamInDb!.members.length).toBe(3);
      await teamService.removeUserFromTeam(
        otherMenber!._id + '',
        team!._id + '',
        team!.createdBy._id + '',
      );
      const teamInDb2 = await teamService.findBySlug('ten-ne');
      expect(teamInDb2!.members).not.toContainEqual(otherMenber!._id);
      expect(teamInDb2!.members.length).toBe(2);
    });
  });
});

const addFakeData = async (
  userService: UserService,
  teamService: TeamService,
) => {
  const newUser = await userService.create({
    email: 'huuhoang@gmail.com',
    rawPassword: '123456',
    username: 'huuhoang',
  });
  await userService.create({
    email: '123@gmail.com',
    rawPassword: '123456',
    username: '2222',
  });

  await userService.create({
    email: '1243@gmail.com',
    rawPassword: '123456',
    username: '224422',
  });

  await teamService.create({
    createdBy: newUser._id + '',
    description: 'test',
    name: 'tên nè',
  });
};
const isObjectID = (id: string) => {
  return ObjectId.isValid(id);
};
