import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AppConfigService } from '../app-config.service'
import { SnackbarService } from '../snackbar.service'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import axiosRetry from 'axios-retry'

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
    private _userKey = 'appCurentUser'
    private _tokenKey = 'appToken'
    private _axiosClient: AxiosInstance
    private _baseUrl: string

    constructor(
        private readonly _appConfig: AppConfigService,
        private readonly _router: Router,
        private readonly _snackbar: SnackbarService,
    ) {
        this._axiosClient = axios.create({
            timeout: this._appConfig.config.API_TIMEOUT,
            withCredentials: true
        })
        axiosRetry(this._axiosClient, { retries: 3, retryDelay: () => { return 2000 } })
        this._baseUrl = `${this._appConfig.config.API_URL}${this._appConfig.config.API_PREFIX}`

        this._axiosClient.interceptors.request.use(
            (config): any => {
                const token = localStorage.getItem(this._tokenKey)
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token
                }

                return config
            }, (error) => {
                return Promise.reject(this._handleError(error))
            })

        this._axiosClient.interceptors.response.use((response: AxiosResponse) => {
            return this._handleResponse(response)
        }, (error: AxiosError) => {
            return Promise.reject(this._handleError(error))
        })
    }

    protected async _axiosCall<T>(method: Method, options: GetOptions | PostOptions): Promise<T> {
        try {
            const requestConfig: AxiosRequestConfig = {
                method,
                url: `${this._baseUrl}${options.path}`,
            }

            const paramsMethod = ['get']
            paramsMethod.includes(method) ?
                requestConfig.params = options.params :
                requestConfig.data = options.params

            const axiosResponse = await this._axiosClient.request<T>(requestConfig)
            return axiosResponse.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    public async get<T>(options: GetOptions): Promise<T> { return this._axiosCall('get', options) }
    public async post<T>(options: PostOptions): Promise<T> { return this._axiosCall('post', options) }
    public async patch<T>(options: PostOptions): Promise<T> { return this._axiosCall('patch', options) }
    public async put<T>(options: PostOptions): Promise<T> { return this._axiosCall('put', options) }
    public async delete<T>(options: GetOptions): Promise<T> { return this._axiosCall('delete', options) }
    public getAxiosClient(): AxiosInstance { return this._axiosClient }
    public getBaseUrl(): string { return this._baseUrl }
    public getUserKey(): string { return this._userKey }
    public getTokenKey = (): string => this._tokenKey //fait le return direct (sans les {})

    private _handleResponse = (data: AxiosResponse): AxiosResponse => {
        return data
    }
    private _handleError = (error: AxiosError): AxiosError => {
        const responseStatus = `${error.response?.status}`
        switch (true) {
            case responseStatus === '504':
            case error.code === 'ERR_NETWORK':
                this._snackbar.error('Le serveur semble être injoignable, veuillez réessayer.')
                break
            case responseStatus === '500':
                this._snackbar.error('Erreur, veuillez réessayer.')
                break
            case responseStatus === '401':
                if (this._router.url !== '/') {
                    this._snackbar.error('Votre session à expiré, veuillez vous reconnecter')
                    localStorage.removeItem(this._tokenKey)
                    localStorage.removeItem(this._userKey)
                    this._router.navigate(['/'])
                }
                break
        }
        return error
    }
}
