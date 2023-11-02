import { Inject, Injectable, inject } from '@angular/core'
import { LoadingSpinnerService } from '../../overlay.service'
import { AxiosClientService } from '../axios-client.service'
import { AxiosError } from 'axios'


@Injectable({
    providedIn: 'root'
})
export class ApiModelService<T, ApiT> {

    path!: string
    axios = inject(AxiosClientService)
    loadingSpinnerService = inject(LoadingSpinnerService)
    entity: any

    constructor() { }

    async create(entity: ApiT): Promise<T | AxiosError> {
        const data: ApiT | AxiosError = await this.axios.post({ path: `${this.path}`, params: entity as any })
        return data instanceof AxiosError ? data : new this.entity(data)
    }

    async find(): Promise<T[] | AxiosError> {
        const data: ApiT[] | AxiosError = await this.axios.get({ path: `${this.path}` })
        return data instanceof AxiosError ? data : data.map(e => new this.entity(e))
    }

    async findOne(id: number): Promise<T | AxiosError> {
        const data: ApiT | AxiosError = await this.axios.get({ path: `${this.path}/${id}` })
        return data instanceof AxiosError ? data : this.entity(data)
    }

    async update(id: number, entity: T | AxiosError) {
        const data: ApiT | AxiosError = await this.axios.patch({ path: `${this.path}/${id}`, params: entity as any })
        return data instanceof AxiosError ? data : new this.entity(data)
    }

    async delete(id: number): Promise<boolean> {
        const data: ApiT | AxiosError = await this.axios.delete({ path: `${this.path}/${id}` })
        return data instanceof AxiosError ? data : this.entity(data)
    }
}
