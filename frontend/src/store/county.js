const LANDING = 'county/landing'


const getLandingAction = payload => {

    return {
        type: LANDING,
        payload
    }
}




// all groups
export const fetchLandingSampleThunk = () => async dispatch => {

    const response = await fetch('/api/county/landing',{
     method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {

        const countySample = await response.json()
        

        dispatch(getLandingAction(countySample));

        return countySample
    }

}





const initialState = {}

const groupReducer = (state = initialState, action) => {

    let newState = {};

    switch (action.type) {


      case LANDING: {
    if (!action.payload) return state;
    return [...action.payload]; // keep everything as an array
}

 

        default: {
            return state;
        }
    }
}


export default groupReducer;