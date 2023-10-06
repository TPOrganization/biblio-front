import { Role } from 'src/app/_roles/roles.enum'

export interface MenuNode {
    translateKey: string
    link?: string
    icon?: string
    children?: MenuNode[]
    show?: boolean
    roles?: Array<keyof typeof Role> | undefined
    click?: () => void
}
export interface MenuFlatNode {
    expandable: boolean
    translateKey: string
    level: number
    icon?: string
    link?: string
    roles?: Array<keyof typeof Role> | undefined
    click?: () => void
}

