const initialState = {
    listTasks: [],
    statusId: null
}

const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TASK': {
            break;
        }
        case 'SET_STATUS_TASK': {
            break;
        }
        case 'DELETE_TASK': {
            break;
        }
        case 'UPDATE_TASK': {
            break;
        }
        default:
            return state;
    }
}

export default TaskReducer;