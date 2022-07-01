import './App.scss';
import SiderBar from './components/siderBar/SiderBar';
import Navbar from './components/navBar/Navbar';
import AllTask from './views/allTasks/AllTask';
import DoingTask from './views/doingTasks/DoingTask';
import DoneTask from './views/doneTasks/DoneTask';
import NewTask from './views/newTasks/NewTask';
import CreateTask from './views/createNewTask/CreateTask';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { createNewTask, deleteTaskById, getAllTasks, updateTaskById } from './apis/TaskApi';
import DetailTask from './views/detailTask/DetailTask';
import { LIMIT_TASK_IN_PAGE } from './constants/Data';
import Pagination from './components/pagination/Pagination';
import HomePage from './views/homepage/HomePage';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTasks, setNewTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [dataFilter, setDataFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1)

  //list all task
  useEffect(() => {
    getAllListTasks();
  }, []);

  // handleChangeSearch();
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
      await newTaskStatus();
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
    try {
      await deleteTaskById(id);
      await getAllListTasks();
      await doingTaskStatus();
      await doneTaskStatus();
      await newTaskStatus();
    } catch (error) {
      console.log(error);
    }
  }

  //search task name, creator
  const lowercasedFilter = dataFilter.toLowerCase();
  const dataFilterSearch = tasks.filter(item => {
    return (
      item.title.toUpperCase().includes(lowercasedFilter.toUpperCase()) ||
      item.creator.toUpperCase().includes(lowercasedFilter.toUpperCase())
    )
  });

  //input value search task
  const handleChangeSearch = (e) => {
    setDataFilter(e.target.value)
  }

  //get pagination
  const getTaskCurrentPage = () => {
    const startIndex = currentPage * LIMIT_TASK_IN_PAGE - LIMIT_TASK_IN_PAGE;
    return [...dataFilterSearch.slice(startIndex, startIndex + LIMIT_TASK_IN_PAGE)]
  }
  const listPaginationPage = getTaskCurrentPage()

  const handleSetCurrentPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <Router>
      <div className="App-container">
        <div className="App-container__Navbar">
          <Navbar dataFilter={dataFilter} handleChangeSearch={handleChangeSearch} />
        </div>
        <div className="App">
          <div className="siderbar-container">
            <SiderBar />
          </div>
          <div className="task-container">
            <Switch>
              <Route path="/" exact>
                <div className="all-task">
                  <HomePage />
                </div>
              </Route>
              <Route path="/all-task">
                <div className="all-task">
                  {listPaginationPage.map((item, index) => {
                    return (
                      <AllTask
                        key={item.id}
                        task={item}
                        handleGetTask={handleUpdateTask}
                      />
                    )
                  })}
                </div>
                <Pagination
                  currentPage={currentPage}
                  tasks={tasks}
                  limit={LIMIT_TASK_IN_PAGE}
                  handleSetCurrentPage={handleSetCurrentPage}
                />
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
              <Route path="/create-task" >
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
      </div>
    </Router>
  );
}

export default App;
