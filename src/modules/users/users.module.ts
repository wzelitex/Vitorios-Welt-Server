import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaFactory } from './schema/users.base.schema';
import { Module } from '@nestjs/common';

/*
    import services 
*/

/*
    import controllers 
*/
import { ClientUsersController } from './client/client.users.controller';
import { AdminUsersController } from './admin/admin.users.controller';

/*
    import utils
*/
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { GetCommonUsers, GetSpecificPropUsers } from './logic/get.users';
import { UpdateCommonUsers } from './logic/update.users';
import { DeleteCommonUsers } from './logic/delete.users';
import { AdminUsersService } from './admin/admin.users.service';
import { ClientUsersService } from './client/client.users.service';
import { CreateCommonUsers } from './logic/create.users';
import { SanitizeService } from 'src/utils/SanitizeService.utils';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Users',
        schema: UserSchemaFactory,
      },
    ]),
  ],
  controllers: [AdminUsersController, ClientUsersController],
  providers: [
    ResponseServerService,
    GetCommonUsers,
    CreateCommonUsers,
    GetSpecificPropUsers,
    UpdateCommonUsers,
    DeleteCommonUsers,
    AdminUsersService,
    ClientUsersService,
    SanitizeService,
  ],
  exports: [GetCommonUsers, MongooseModule, GetSpecificPropUsers],
})
export class UsersModule {}
