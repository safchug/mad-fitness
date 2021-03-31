import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
// import { IRolesService, ROLES_SERVICE } from './roles/roles.service';
// import { Role } from './roles/interface/roles.interface';

@Controller()
export class AppController {
  constructor(
    // @Inject(ROLES_SERVICE) private readonly rolesService: IRolesService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('ioc')
  // async getRoles(): Promise<Role[]> {
  //   return await this.rolesService.findAll();
  // }
}
