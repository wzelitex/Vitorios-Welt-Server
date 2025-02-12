import { Injectable } from '@nestjs/common';

/*
    import service 
*/
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { CreateCommonUsers } from '../logic/create.users';
import { GetCommonUsers } from '../logic/get.users';
import { UpdateCommonUsers } from '../logic/update.users';
import { DeleteCommonUsers } from '../logic/delete.users';

@Injectable()
export class AdminUsersService {
  constructor(
    private readonly responseServer: ResponseServerService,
    private readonly createCommonUsers: CreateCommonUsers,
    private readonly getCommonUsers: GetCommonUsers,
    private readonly updateCommonUsers: UpdateCommonUsers,
    private readonly deleteCommonUsers: DeleteCommonUsers,
  ) {}
}
