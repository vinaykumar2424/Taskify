import { Link } from 'react-router-dom';
import './tasks.css'
import React, { useState } from 'react';
import logo from '../images/logotwo.png'
import TaskBoxes from './TaskBoxes/TaskBoxes';

const Tasks = () => {

    // states
    const [tasks, setTasks] = useState([]);
    const [activeOption, setActiveOption] = useState('All Tasks');
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        team: '',
        assignee: '',
        startDate: new Date(),
        endDate: null,
        priority: 'P0',
        status: 'Pending',
    });
    const [editedTaskIndex, setEditedTaskIndex] = useState(null);
    const [filterOptions, setFilterOptions] = useState({
        assignee: '',
        priority: '',
        startDate: null,
        endDate: null
    });
    const [sortBy, setSortBy] = useState('priority');
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [showTaskBox, setShowTaskBox] = useState(false);
    const [allFilterTasks, setAllFilterTasks] = useState(false);

    // functions

    // function to set the active status is navbar
    const handleOptionClick = (option) => {
        setActiveOption(option);
    };

    // function to handle input change in Add Task Modal
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTask({
            ...newTask,
            [name]: value
        });
    };

    // function to reseting the task box after the task added
    const resetNewTask = (e) => {
        setNewTask({
            title: '',
            description: '',
            team: '',
            assignee: '',
            startDate: new Date(),
            endDate: null,
            priority: 'P0',
            status: 'Pending',
        });
    };

    // function to add task
    const addTask = (e) => {
        e.preventDefault();
        let title = newTask.title.trim();
        if (title === '') {
            title = `Project${tasks.length + 1}`;
        }
        setTasks([...tasks, { ...newTask, title }]);
        resetNewTask();
    };

    // function to filter the tasks 
    const filterTasks = () => {
        let filteredTasks = tasks.filter(task => {
            setShowFilter(false)
            let isMatch = true;
            if (filterOptions.assignee && task.assignee !== filterOptions.assignee) {
                isMatch = false;
            }
            if (filterOptions.priority && task.priority !== filterOptions.priority) {
                isMatch = false;
            }
            if (filterOptions.startDate && task.startDate < filterOptions.startDate) {
                isMatch = false;
            }
            if (filterOptions.endDate && task.endDate > filterOptions.endDate) {
                isMatch = false;
            }
            return isMatch;
        });
        setAllFilterTasks(filteredTasks)
        console.log(filteredTasks)
        return filteredTasks;
    };
    
    // function to sort the tasks
    const sortTasks = (allFilterTasks) => {
        const tasksToSort = allFilterTasks && allFilterTasks.length > 0 ? allFilterTasks : tasks;
        setShowSort(false)
        return tasksToSort.sort((a, b) => {
            if (sortBy === 'priority') {
                return a.priority.localeCompare(b.priority);
            } else if (sortBy === 'startDate') {
                return a.startDate - b.startDate;
            } else if (sortBy === 'endDate') {
                return a.endDate - b.endDate;
            }
            console.log(tasksToSort)
        });
    };

    // function to gettig value for sortBy
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };
    
    // function to submit the edited task
    const handleEditSubmit = () => {
        const updatedTasks = tasks.map((task, index) => {
            if (index === editedTaskIndex) {
                return {
                    ...task,
                    priority: newTask.priority,
                    status: newTask.status,
                };
            }
            return task;
        });

        setTasks(updatedTasks);
        setEditedTaskIndex(null);
        resetNewTask(); 
    };

    return (
        <div className='tasks'>
            <nav>
                <div className='title-bar'>
                    <img src={logo} alt='' />
                    <span>Taskify</span>
                </div>
                <div className='options'>
                    <Link className={activeOption === 'All Tasks' ? 'active-option' : ''} onClick={() => handleOptionClick('All Tasks')}>All Tasks</Link>
                    <Link className={activeOption === 'Pending' ? 'active-option' : ''} onClick={() => handleOptionClick('Pending')}>Pending</Link>
                    <Link className={activeOption === 'In Progress' ? 'active-option' : ''} onClick={() => handleOptionClick('In Progress')}>In Progress</Link>
                    <Link className={activeOption === 'Completed' ? 'active-option' : ''} onClick={() => handleOptionClick('Completed')}>Completed</Link>
                    <Link className={activeOption === 'Deployed' ? 'active-option' : ''} onClick={() => handleOptionClick('Deployed')}>Deployed</Link>
                    <Link className={activeOption === 'Deferred' ? 'active-option' : ''} onClick={() => handleOptionClick('Deferred')}>Deferred</Link>
                </div>
            </nav>
            <section className='all-tasks'>
                <div className='top-part'>
                    <div className="filter-sort">
                        <button onClick={() => { setShowFilter(!showFilter); setShowSort(false) }}>Filter</button>
                        {showFilter && (<div className="filter">
                            <span>Choose filter</span>
                            <input type="text" name="assignee" placeholder="Assignee" value={filterOptions.assignee} onChange={(e) => setFilterOptions({ ...filterOptions, assignee: e.target.value })} />
                            <select name="priority" value={filterOptions.priority} onChange={(e) => setFilterOptions({ ...filterOptions, priority: e.target.value })}>
                                <option value="">Select Priority</option>
                                <option value="P0">P0</option>
                                <option value="P1">P1</option>
                                <option value="P2">P2</option>
                            </select>
                            <span>Start date</span>
                            <input type="date" name="startDate" value={filterOptions.startDate ? filterOptions.startDate.toISOString().split('T')[0] : ''} onChange={(e) => setFilterOptions({ ...filterOptions, startDate: e.target.value ? new Date(e.target.value) : null })} />
                            <span>End date</span>
                            <input type="date" name="endDate" value={filterOptions.endDate ? filterOptions.endDate.toISOString().split('T')[0] : ''} onChange={(e) => setFilterOptions({ ...filterOptions, endDate: e.target.value ? new Date(e.target.value) : null })} />
                            <div className='buttons'>
                                <button onClick={filterTasks}>Submit</button>
                                <button onClick={()=>{setAllFilterTasks(false);setShowFilter(false);}}>clear</button>
                            </div>
                        </div>
                        )}
                        <button onClick={() => { setShowSort(!showSort); setShowFilter(false) }}>Sort</button>
                        {showSort && (<div className="sort">
                            <select value={sortBy} onChange={handleSortChange} className='sort-settings'>
                                <option value="priority">Priority</option>
                                <option value="startDate">Start Date</option>
                                <option value="endDate">End Date</option>
                            </select>
                            <button onClick={sortTasks}>Submit</button>
                        </div>
                        )}
                    </div>
                    <button onClick={() => setShowTaskBox(!showTaskBox)}>Add tasks</button>
                    {(showTaskBox || editedTaskIndex !== null) && (<form className='add-task-box' >
                        <span>Task details</span>
                        <span className='close-btn' onClick={() => setShowTaskBox(!showTaskBox)}> &#10799;</span>
                        <span className='box-fields'>
                            <span>Title</span>
                            <input type="text" name="title" placeholder="Task name" value={editedTaskIndex !== null ? tasks[editedTaskIndex].title : newTask.title} onChange={handleInputChange} {...(newTask.title.trim() === '' && { required: true })} />
                        </span>
                        <span className='box-fields'>
                            <span>Description</span>
                            <textarea type="text" name="description" placeholder="Task description (max: 300)" value={editedTaskIndex !== null ? tasks[editedTaskIndex].description : newTask.description} onChange={handleInputChange} maxLength={300}></textarea>
                        </span>
                        <span className='box-fields'>
                            <span>Team</span>
                            <input type="text" name="team" placeholder="Avengers" value={editedTaskIndex !== null ? tasks[editedTaskIndex].team : newTask.team} onChange={handleInputChange} />
                        </span>
                        <span className='box-fields'>
                            <span>Assignee</span>
                            <input type="text" name="assignee" placeholder="@Vinay" value={editedTaskIndex !== null ? tasks[editedTaskIndex].assignee : newTask.assignee} onChange={handleInputChange} />
                        </span>
                        <div>
                            <span>
                                <span>Priority:</span>
                                <select name="priority" value={newTask.priority} onChange={handleInputChange}>
                                    <option value="P0">P0</option>
                                    <option value="P1">P1</option>
                                    <option value="P2">P2</option>
                                </select>
                            </span>
                            <span>
                                <span>Status:</span>
                                <select name="status" value={newTask.status} onChange={handleInputChange}>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Deployed">Deployed</option>
                                    <option value="Deferred">Deferred</option>
                                </select>
                            </span>
                        </div>
                        <div className='buttons'>
                            {editedTaskIndex !== null ? <button onClick={handleEditSubmit}>Save Changes</button> : <button onClick={addTask}>Add Task</button>}
                            {editedTaskIndex !== null ? <button onClick={() => setEditedTaskIndex(null)}>Cancel</button> : <button type="reset" value="Reset" onClick={(e) => {
                                e.preventDefault();
                                setNewTask({
                                    title: '',
                                    description: '',
                                    team: '',
                                    assignee: '',
                                    startDate: new Date(),
                                    endDate: null,
                                    priority: 'P0',
                                    status: 'Pending',
                                });
                            }}>Reset</button>
                            }
                        </div>
                    </form>
                    )}
                </div>
                {
                    <TaskBoxes tasks={allFilterTasks && allFilterTasks.length > 0 ? allFilterTasks : tasks} setTasks={setTasks} setEditedTaskIndex={setEditedTaskIndex} activeOption={activeOption} />}
            </section>
        </div>
    )
}
export default Tasks;