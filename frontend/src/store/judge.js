const allJudgesInCounty = 'judge/judgeList'


const getAllJudgesAction = payload => {

    return {
        type: allJudgesInCounty,
        payload
    }
}




// all groups
export const fetchAllJudgesInCountyThunk = (county) => async dispatch => {

    const response = await fetch(`/api/judges/all/${county}`,{
     method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {

        const judgeSample = await response.json()
        

        dispatch(getAllJudgesAction(judgeSample));

        return judgeSample
    }

}





const initialState = {}

const judgeReducer = (state = initialState, action) => {

    let newState = {};

    switch (action.type) {


      case allJudgesInCounty: {
    if (!action.payload) return state;
    return [...action.payload]; // keep everything as an array
}

 

        default: {
            return state;
        }
    }
}


export default judgeReducer;