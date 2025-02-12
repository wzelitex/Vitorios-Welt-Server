import { Injectable } from '@nestjs/common';

/*
    import service 
*/
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { GetCommonUsers, GetSpecificPropUsers } from '../logic/get.users';
import { UpdateCommonUsers } from '../logic/update.users';
import { DeleteCommonUsers } from '../logic/delete.users';
import { StatusCode } from 'src/enums/StatusCode';
import { MessageGetUsers, MessageUpdateUsers } from '../enum/message.users';
import {
  ClientUsersUpdateDto,
  ClientUserUpdateLocationDto,
} from '../dto/update.users.dto';

@Injectable()
export class ClientUsersService {
  constructor(
    private readonly responseServer: ResponseServerService,
    private readonly getCommonUsers: GetCommonUsers,
    private readonly updateCommonUsers: UpdateCommonUsers,
    private readonly deleteCommonUsers: DeleteCommonUsers,
    private readonly getSpecificUsers: GetSpecificPropUsers,
  ) {}

  async getInfo(id: string) {
    const response = await this.getCommonUsers.getUserById(id);
    if (!response)
      return this.responseServer.error(
        StatusCode.NOT_FOUND,
        MessageGetUsers.notFound,
      );
    return this.responseServer.success(
      StatusCode.OK,
      MessageGetUsers.found,
      response,
    );
  }

  async getEmail(id: string) {
    const response = await this.getSpecificUsers.getEmailById(id);
    if (!response)
      return this.responseServer.error(
        StatusCode.NOT_FOUND,
        MessageGetUsers.notFound,
      );

    return this.responseServer.success(
      StatusCode.OK,
      MessageGetUsers.found,
      response,
    );
  }

  async putInfo(id: string, data: ClientUsersUpdateDto) {
    const response = await this.updateCommonUsers.updateGeneralDataById(
      id,
      data,
    );
    if (!response)
      return this.responseServer.error(
        StatusCode.NOT_FOUND,
        MessageGetUsers.notFound,
      );
    return this.responseServer.success(
      StatusCode.OK,
      MessageUpdateUsers.updated,
    );
  }

  async putLocation(id: string, data: ClientUserUpdateLocationDto) {
    const response = await this.updateCommonUsers.updateLocationDataById(
      id,
      data,
    );
    if (!response)
      return this.responseServer.error(
        StatusCode.NOT_FOUND,
        MessageGetUsers.notFound,
      );
    return this.responseServer.success(
      StatusCode.OK,
      MessageUpdateUsers.updated,
    );
  }
}
