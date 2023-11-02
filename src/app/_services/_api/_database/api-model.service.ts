import { Inject, Injectable } from '@angular/core'
import { LoadingSpinnerService } from '../../overlay.service'
import { AxiosClientService } from '../axios-client.service'
import { AxiosError } from 'axios'
import { ApiUser, User } from 'src/app/_models/_services/_api/_database/user/user.models'


export interface UserForm {
    email: string
    firstName: string
    lastName: string
}


@Injectable({
    providedIn: 'root'
})
export class ApiModelService<T, ApiT> {

    path!: string
    constructor(
        public readonly axios: AxiosClientService,
        public loadingSpinnerService: LoadingSpinnerService
        // @Inject('') private readonly T: any
    ) { }


    // async update(formValue: UserForm): Promise<User | AxiosError>{
    //     try{
    //         this.loadingSpinnerService.attachOverlay()
    //         const data: ApiUser = await this.axios.post({path: `${this.path}/user/${id}`, params: formValue})
    //         this.loadingSpinnerService.detachOverlay()
    //         return data
    //     }
    //     catch (error) {
    //         this.loadingSpinnerService.detachOverlay()
    //         return error as AxiosError
    //     }
    // }
    //update 
    //create
    //find
    // Todo (si findById dans le back alors faire le bon appel ici)
}
