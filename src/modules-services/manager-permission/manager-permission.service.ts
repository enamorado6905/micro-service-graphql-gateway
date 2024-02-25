import { Injectable } from '@nestjs/common';
import { CreateManagerPermissionInput } from './dto/create-manager-permission.input';
import { UpdateManagerPermissionInput } from './dto/update-manager-permission.input';

@Injectable()
export class ManagerPermissionService {
  create(createManagerPermissionInput: CreateManagerPermissionInput) {
    return 'This action adds a new managerPermission';
  }

  findAll() {
    return `This action returns all managerPermission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} managerPermission`;
  }

  update(id: number, updateManagerPermissionInput: UpdateManagerPermissionInput) {
    return `This action updates a #${id} managerPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} managerPermission`;
  }
}
