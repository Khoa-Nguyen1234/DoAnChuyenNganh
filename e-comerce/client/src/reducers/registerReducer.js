const registerReducer = (state= false, action) =>{
    switch(action.type){
        case 'REGISTER':
            return true;
        default:
            return false;
    }
}
export default registerReducer;