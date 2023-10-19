import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AppConfigService } from '../app-config.service'
import { SnackbarService } from '../snackbar.service'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import axiosRetry from 'axios-retry'
import { AuthService } from './auth/auth.service'

export interface Params {
    [key: string]: any
}
export interface GetOptions {
    path: string
    params?: Params
}

export interface PostOptions {
    path: string
    params: Params
}

@Injectable({
    providedIn: 'root',
})
export class AxiosClientService {
    private userKey = 'appCurentUser'
    private tokenKey = 'appToken'
    private axiosClient: AxiosInstance
    private baseUrl: string

    constructor(
        private readonly appConfig: AppConfigService,
        private readonly router: Router,
        private readonly snackbar: SnackbarService,
    ) {
        this.axiosClient = axios.create({
            timeout: this.appConfig.config.API_TIMEOUT,
            withCredentials: true
        })
        axiosRetry(this.axiosClient, { retries: 3, retryDelay: () => { return 2000 } })
        this.baseUrl = `${this.appConfig.config.API_URL}${this.appConfig.config.API_PREFIX}`

        this.axiosClient.interceptors.request.use(
            (config): any => {
                const token = localStorage.getItem(this.tokenKey)
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token
                }

                return config
            }, (error) => {
                return Promise.reject(this._handleError(error))
            })

        this.axiosClient.interceptors.response.use((response: AxiosResponse) => {
            return this._handleResponse(response)
        }, (error: AxiosError) => {
            return Promise.reject(this._handleError(error))
        })
    }

    protected async axiosCall<T>(method: Method, options: GetOptions | PostOptions): Promise<T> {
        try {
            const requestConfig: AxiosRequestConfig = {
                method,
                url: `${this.baseUrl}${options.path}`,
            }

            const paramsMethod = ['get']
            paramsMethod.includes(method) ?
                requestConfig.params = options.params :
                requestConfig.data = options.params

            const axiosResponse = await this.axiosClient.request<T>(requestConfig)
            return axiosResponse.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    public async get<T>(options: GetOptions): Promise<T> { return this.axiosCall('get', options) }
    public async post<T>(options: PostOptions): Promise<T> { return this.axiosCall('post', options) }
    public async put<T>(options: PostOptions): Promise<T> { return this.axiosCall('put', options) }
    public async delete<T>(options: GetOptions): Promise<T> { return this.axiosCall('delete', options) }
    public getAxiosClient(): AxiosInstance { return this.axiosClient }
    public getBaseUrl(): string { return this.baseUrl }

    public getUserKey(): string { return this.userKey }
    public getTokenKey = (): string => this.tokenKey //fait le return direct (sans les {})

    private _handleResponse = (data: AxiosResponse): AxiosResponse => {
        return data
    }

    private _handleError = (error: AxiosError): AxiosError => {
        const responseStatus = `${error.response?.status}`
        switch (true) {
            case responseStatus === '504':
            case error.code === 'ERR_NETWORK':
                this.snackbar.error('Le serveur semble être injoignable, veuillez réessayer.')
                break
            case responseStatus === '401':
                if (this.router.url !== '/') {
                    this.snackbar.error('Votre session a expiré, veuillez vous reconnecter')
                    localStorage.removeItem(this.tokenKey)
                    localStorage.removeItem(this.userKey)
                    this.router.navigate(['/'])
                }
                break
        }

        return error
    }
}
