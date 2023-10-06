
type zeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type zeroToThree = 0 | 1 | 2 | 3
type zeroToFive = 0 | 1 | 2 | 3 | 4 | 5
type zeroToTenHours = `${0 | 1}${zeroToNine}`
type twoToThreeHours = `${2}${zeroToThree}`
export type CustomTime = `${zeroToTenHours | twoToThreeHours}:${zeroToFive}${zeroToNine}`