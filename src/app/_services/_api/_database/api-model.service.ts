import { Inject, Injectable } from '@angular/core'
import { OverlayService } from '../../overlay.service'
import { AxiosClientService } from '../axios-client.service'

@Injectable({
    providedIn: 'root'
})
export class ApiModelService<T, ApiT> {

    path!: string
    constructor(
        public readonly axios: AxiosClientService,
        private readonly overlay: OverlayService,
        @Inject('') private readonly T: any
    ) { }

    //update 
    //create
    //find
    // Todo (si findById dans le back alors faire le bon appel ici)
}
