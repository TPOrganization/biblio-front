import { Injectable } from '@angular/core'
import axios, { AxiosInstance, AxiosResponse, Method } from 'axios'
import { AppConfigService } from '../app-config.service'

export interface Params {
    [key: string]: any;
}
export interface GetOptions {
    path: string;
    params?: Params;
}

export interface PostOptions {
    path: string;
    params: Params;
}

@Injectable({
    providedIn: 'root',
})
export class AxiosClientService {
    private axiosClient: AxiosInstance
    private apiUrl: string

    constructor(private appConfig: AppConfigService) {
        this.apiUrl = this.appConfig.config.apiUrl

        this.axiosClient = axios.create({
            timeout: this.appConfig.config.apiTimeout,
            withCredentials: true,
        })

        this.axiosClient.interceptors.request.use(
            (config) => {
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        this.axiosClient.interceptors.response.use(
            (response) => {
                this._handleResponse(response);
                return response;
            },
            (error) => {
                this._handleError(error.response);
                return Promise.reject(error);
            }
        );
    }


    protected async axiosCall<T>(
        method: Method,
        options: GetOptions | PostOptions
    ): Promise<T> {
        try {
            const axiosResponse = await this.axiosClient.request<T>({
                method: method,
                url: `${this.apiUrl}${options.path}`,
                data: options.params,
            });
            return axiosResponse.data;
        } catch (error) {
            Promise.reject(error);
            return null as any
        }
    }

    public async get<T>(options: GetOptions): Promise<T> {
        return this.axiosCall('get', options);
    }
    public async post<T>(options: PostOptions): Promise<T> {
        return this.axiosCall('post', options);
    }
    public async put<T>(options: PostOptions): Promise<T> {
        return this.axiosCall('put', options);
    }
    public async delete<T>(options: GetOptions): Promise<T> {
        return this.axiosCall('delete', options);
    }


    //retour message ok
    private _handleResponse = (response: AxiosResponse) => {
        const { data } = response;

    }

    //retour message err
    protected _handleError = (error: any) => {
        const { data } = error
        return Promise.reject(error);
    };
}
