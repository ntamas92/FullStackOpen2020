const initialState = ""

const reducer = (state = initialState, action) => {
    if(action.type === "SET_FILTER") {
        return action.data
    } else if(action.typs === "CLEAR_FILTER") {
        return initialState
    }

    return state
}

export const setFilterAction = message => {
    return {
        type: "SET_FILTER",
        data: message
    }
}

export const clearFilterAction = () => {
    return {
        type: "CLEAR_FILTER"
    }
}

export default reducer