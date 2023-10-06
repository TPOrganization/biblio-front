export interface ApiUtilisateur {
    Id: number
}

export class Utilisateur {
    id: number

    constructor(data: ApiUtilisateur | null) {
        this.id = data ? data.Id : 0
    }

    getApiData(): ApiUtilisateur {
        return {
            Id: this.id
        }
    }
}
