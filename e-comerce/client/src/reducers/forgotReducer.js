const forgotReducer = (state= false, action) =>{
    switch(action.type){
        case 'FORGOT':
            return true;
        default:
            return false;
    }
}

export default forgotReducer;