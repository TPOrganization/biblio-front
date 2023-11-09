import { Injectable } from '@angular/core'
import { ApiModelService } from '../api-model.service';
import { ApiUser, User } from 'src/app/_models/_services/_api/_database/user/user.models';
import { AppConfigService } from 'src/app/_services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiModelService<User, ApiUser> {
  override entity = User
  constructor(
    private readonly appConfigService: AppConfigService
  ) {
    super()
    this.path = appConfigService.config.API_PATH.USER
  }

  
}
