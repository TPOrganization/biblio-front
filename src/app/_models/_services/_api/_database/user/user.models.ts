export interface ApiUser {
    id: number
    firstName: string
    lastName: string
    email: string
}

export class User {
    id: number
    firstName: string
    lastName: string
    email: string

    constructor(data: ApiUser) {
        this.id = data.id ?? 0
        this.firstName = data.firstName ?? ''
        this.lastName = data.lastName ?? ''
        this.email = data.email ?? ''
    }
}