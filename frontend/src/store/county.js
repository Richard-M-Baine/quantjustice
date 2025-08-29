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
        

        dispatch(getLandingAction(countySample.countyCrimes));

        return countySample
    }

}





const initialState = {}

const groupReducer = (state = initialState, action) => {

    let newState = {};

    switch (action.type) {


        case LANDING: {
            if (!action.payload) {
                console.error("Invalid payload  for county.js line 52 panic!:", action.payload);
                return state;
            }
            newState = {};
            action.payload.forEach(county => {
                newState[county.id] = county;
            });
            return newState;
        }

 

        default: {
            return state;
        }
    }
}


export default groupReducer;