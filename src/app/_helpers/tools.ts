import * as moment from 'moment'

export const chunkArray = (arr: Array<any>, size: number): Array<Array<any>> =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    )
export const dateIsValid = (date: Date): boolean => date instanceof Date && !isNaN(date as any)
export const formatDateFromMoment = (date: Date | moment.Moment): string => moment(date).format('YYYY-MM-DD')
export const formatNumberValue = (value: string | number): string => {
    const splittedValue = value.toString().split('.')
    const beforeDecimal = splittedValue.shift() as string
    return beforeDecimal.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (splittedValue.length > 0 ? `,${splittedValue.join('')}` : '')
}
export const firstLetterUpperCase = (str: string): string => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`

export const isMobileDevice = (): boolean => {
    const regexs = [/(Android)(.+)(Mobile)/i, /BlackBerry/i, /iPhone|iPod/i, /Opera Mini/i, /IEMobile/i]
    return regexs.some((b) => navigator.userAgent.match(b)) || window.screen.width <= 991
}

export const isTabletDevice = (): boolean => {
    const regex = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/
    return regex.test(navigator.userAgent.toLowerCase())
}