import { atom, selector } from 'recoil'

export const signUpInfo = atom({
    key: 'signUpInfo',
    default: {
        name: '',
        phoneNum: null,
        address: '',
        carNum: '',
        id: '',
        pw: '',
        agreeCheck: false,
    },
})

export const signUpInfoSelector = selector({
    key: 'signUpInfoSelector',
    get: ({ get }) => {
        return get(signUpInfo)
    },
})

export const orderInfo = atom({
    key: 'orderInfo',
    default: {
        id: '',
        containerNum: '',
        location: '',
        terminal: '',
        hour: null,
        minute: null,
    },
})

export const orderInfoSelector = selector({
    key: 'orderInfoSelector',
    get: ({ get }) => {
        return get(orderInfo)
    },
})