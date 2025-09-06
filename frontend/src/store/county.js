const LANDING = 'county/landing'
const Individual = 'county/individual'


const getLandingAction = payload => {

    return {
        type: LANDING,
        payload
    }
}

const getIndividualAction = payload => {

    return {
        type: Individual,
        payload
    }
}




// county Landing
export const fetchCountyLandingSampleThunk = () => async dispatch => {

    const response = await fetch('/api/county/landing', {
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

// county individual compare 3 judges

// all groups
export const fetchIndividualCountyJudgesThunk = (county) => async dispatch => {

    const response = await fetch(`/api/county/individual/${county}`, {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {

        const individualSample = await response.json()


        dispatch(getIndividualAction(individualSample));

        return individualSample
    }

}






const initialState = {}

const countyReducer = (state = initialState, action) => {



    switch (action.type) {


        case LANDING: {
            if (!action.payload) return state;
            return [...action.payload]; // keep everything as an array
        }
        case Individual: {
            if (!action.payload) return state;
            return [...action.payload]; // keep everything as an array
        }



        default: {
            return state;
        }
    }
}


export default countyReducer;