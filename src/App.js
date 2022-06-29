import './App.scss';
import SiderBar from './views/SiderBar';
import Navbar from './views/Navbar';
import AllTask from './views/AllTask';
import DoingTask from './views/DoingTask';
import DoneTask from './views/DoneTask';
import NewTask from './views/NewTask';
import CreateTask from './views/CreateTask';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { createNewTask, deleteTaskById, getAllTasks, updateTaskById } from './apis/TaskApi';
import DetailTask from './views/DetailTask';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTasks, setNewTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  //list all task
  useEffect(() => {
    getAllListTasks();
  }, []);

  const getAllListTasks = async () => {
    try {
      const data = await getAllTasks();
      data && setTasks(data)
    } catch (error) {
      console.log(error);
    }
  }
  //list new task
  useEffect(() => {
    newTaskStatus()
  }, [])

  const newTaskStatus = async () => {
    try {
      const data = await getAllTasks();
      const newTask = data.filter(item => item.status === "new")
      data && setNewTasks(newTask)
    } catch (error) {
      console.log(error);
    }
  }
  //lisk doing task
  useEffect(() => {
    doingTaskStatus()
  }, [])

  const doingTaskStatus = async () => {
    try {
      const data = await getAllTasks();
      const doingTask = data.filter(item => item.status === "doing")
      data && setDoingTasks(doingTask)
    } catch (error) {
      console.log(error);
    }
  }
  //listk done task
  useEffect(() => {
    doneTaskStatus()
  }, [])

  const doneTaskStatus = async () => {
    try {
      const data = await getAllTasks();
      const doneTask = data.filter(item => item.status === "done")
      data && setDoneTasks(doneTask)
    } catch (error) {
      console.log(error);
    }
  }
  //update task
  const handleUpdateTask = async (item) => {
    try {
      const index = tasks.findIndex(task => task.id === item.id);
      tasks[index] = { ...item }
      await updateTaskById(item.id, tasks[index]);
      await getAllListTasks();
      await doingTaskStatus();
      await doneTaskStatus();
    } catch (error) {
      console.log(error);
    }
  }

  //add new
  const onAddNew = async (item) => {
    if (!tasks) return false;
    const task = {
      ...item,
      id: Math.floor(Math.random() * 10001),
    }
    try {
      await createNewTask(task);
      await getAllListTasks();
      await newTaskStatus()
    } catch (error) {
      console.log(error);
    }
  }

  //delete task
  const handleDeleteTask = async (id) => {
    console.log(">>check id: ", tasks.id);
    try {
      await deleteTaskById(id);
      await getAllListTasks();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Router>
        <Navbar />
        <div className="App">
          <div className="siderbar-container">
            <SiderBar />
          </div>
          <div className="task-container">
            <Switch>
              <Route path="/all-task" exact>
                <div className="all-task">
                  {tasks.map((item) => {
                    return (
                      <AllTask
                        key={item.id}
                        task={item}
                        handleGetTask={handleUpdateTask}
                      />
                    )
                  })}
                  <div className="pagination">

                  </div>
                </div>

              </Route>
              <Route path="/new-task">
                <div className="all-task">
                  {newTasks.map(item => {
                    return (
                      <NewTask
                        key={item.id}
                        newTask={item}
                      />
                    )
                  })}
                </div>

              </Route>
              <Route path="/doing-task">
                <div className="all-task">
                  {doingTasks.map(item => {
                    return (
                      <DoingTask
                        key={item.id}
                        doingTasks={item}
                      />
                    )
                  })}
                </div>
              </Route>
              <Route path="/done-task">
                <div className="all-task">
                  {doneTasks.map(item => {
                    return (
                      <DoneTask
                        key={item.id}
                        doneTasks={item}
                      />
                    )
                  })}
                </div>

              </Route>
              <Route path="/create-task" exact>
                <CreateTask onAddNew={onAddNew} />
              </Route>
              <Route path="/task/:id">
                <DetailTask
                  handleUpdateTask={handleUpdateTask}
                  handleDeleteTask={handleDeleteTask}
                />
              </Route>

            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
