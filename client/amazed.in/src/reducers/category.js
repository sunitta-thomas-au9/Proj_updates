const category = (state={}, action) => {
    switch(action.type){
        case 'CATEGORIES':
            return { ...state, Categories: action.payload }
        
        default:
            return state
    }
}

export default category;