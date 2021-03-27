const product = (state={}, action) => {
    switch(action.type) {
        case 'ALL_PRODUCTS':
            return { ...state, getAllCoupons: action.payload }

        case 'CREATE_PRODUCTS':
            return { ...state, createCoupon: action.payload }

            default:
                return state
        }
    }
    
    export default product;