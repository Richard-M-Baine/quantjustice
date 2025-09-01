const MisconductSearch = 'misconduct/landing'


const getMisconductAction = payload => {

    return {
        type: MisconductSearch,
        payload
    }
}




// all groups
export const fetchMisconductSearchThunk = (payload) => async dispatch => {

    const response = await fetch('/api/county/misconduct',{
     method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {

        const countySample = await response.json()
        

        dispatch(getMisconductAction(countySample));

        return countySample
    }

}





const initialState = {}

const misconductReducer = (state = initialState, action) => {

    let newState = {};

    switch (action.type) {


      case MisconductSearch: {
    if (!action.payload) return state;
    return [...action.payload]; // keep everything as an array
}

 

        default: {
            return state;
        }
    }
}


export default misconductReducer;