export const addNewTask = (task) => {
    return {
        type: 'ADD_TASK',
        payload: task
    }
}

export const setStatusTask = (task) => {
    return {
        type: 'SET_STATUS_TASK',
        payload: task,
    }
}

export const setDeleteTask = (task) => {
    return {
        type: 'DELETE_TASK',
        payload: task
    }
}

export const setUpdateTask = (task) => {
    return {
        type: 'UPDATE_TASK',
        payload: task
    }
}