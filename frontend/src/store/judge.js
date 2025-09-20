const allJudgesInCounty = 'judge/judgeList'
const judgeSearch = 'judge/search'

const getAllJudgesAction = payload => {

    return {
        type: allJudgesInCounty,
        payload
    }
}

const judgeSearchAction = payload => {

    return {
        type: judgeSearch,
        payload
    }
}

// all groups
// all groups
export const fetchJudgeSearchThunk = (searchGroup) => async dispatch => {
  const queryParams = new URLSearchParams(searchGroup).toString();

  const response = await fetch(`/api/judges/search?${queryParams}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const results = await response.json();
    dispatch(judgeSearchAction(results));
    return results;
  }
};



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



    switch (action.type) {


      case allJudgesInCounty: {
    if (!action.payload) return state;
    return [...action.payload]; // keep everything as an array
}

    case judgeSearch: {
          if (!action.payload) return state;
    return [...action.payload]; // keep everything as an array
    }

        default: {
            return state;
        }
    }
}


export default judgeReducer;