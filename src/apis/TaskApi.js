import axiosClient from "../untils/axiosClient"

//show all todo
export const getAllTasks = async () => {
    const { data } = await axiosClient.get("listTasks", {
        params: {
            _sort: "id",
            _order: "desc",
        }
    })
    return data;
}

//create new todo
export const createNewTask = async (body) => {
    await axiosClient.post("listTasks", {
        ...body
    })
}
//get task with id
export const getTaskById = async (id) => {
    const { data } = await axiosClient.get(`listTasks/${id}`)
    return data;
}

//update task
export const updateTaskById = async (id, body) => {
    await axiosClient.put(`listTasks/${id}`, {
        ...body
    })
}

// //delete todo
export const deleteTaskById = async (id) => {
    await axiosClient.delete(`listTasks/${id}`)
}



