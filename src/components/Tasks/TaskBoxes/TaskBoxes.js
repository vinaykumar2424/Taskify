import { useState } from 'react';
import './taskboxes.css'
import './taskboxesResponsive.css'
import noTaskImage from '../../images/no-task.png'
const TaskBoxes = ({ tasks, setTasks, setEditedTaskIndex, activeOption }) => {

    const [showOptions, setShowOptions] = useState(null);

    const deleteTask = (index) => {
        if (tasks[index].status !== 'Completed' && tasks[index].status !== 'Deployed') {
            setTasks(tasks.filter((task, i) => i !== index));
        }
        setShowOptions(null);
    };

    const toggleOptions = (index) => {
        setShowOptions(showOptions === index ? null : index);
    };

    const handleEdit = (index) => {
        setEditedTaskIndex(index);
        setShowOptions(null);
    };

    // Filter tasks based on active option
    const filteredTasks = tasks.filter(task => {
        if (activeOption === 'All Tasks') {
            return true;
        } else {
            return task.status === activeOption;
        }
    });

    // Function to format date as "10 Jan 2023 - 20 Jan 2023" or the end date if status is "Completed"
    const formatDate = (startDate, endDate, status) => {
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        const startDateFormat = startDate ? new Date(startDate).toLocaleDateString('en-US', options) : '';
        let endDateFormat = endDate ? new Date(endDate).toLocaleDateString('en-US', options) : 'Present';
        if (status === 'Completed' || status === 'Deployed') {
            endDateFormat = endDate ? new Date(endDate).toLocaleDateString('en-US', options) : startDateFormat;
        }
        return `${startDateFormat} - ${endDateFormat}`;
    };


    // console.log(filteredTasks)

    return (
        <div id="all-tasks-boxes">
            {filteredTasks.length === 0 ? (
                <div className='no-task-image'>
                    <img src={noTaskImage} alt='' />
                    <span>No Task Available</span>
                </div>
            ) : (
                filteredTasks.map((task, index) => (
                    <div className="task" key={index}>
                        <div className='title'>
                            <span>
                                <span>{task.title !== '' ? task.title : 'Undefined'}</span>
                                <span>{formatDate(task.startDate, task.endDate, task.status)}</span>
                            </span>
                            <span>{task.priority}</span>
                        </div>
                        <div className='desc'>{task.description !== '' ? task.description : 'No description available'}</div>
                        <div className='assignee'>
                            <span>{task.assignee !== '' ? task.assignee : 'No assignee'}</span>
                            <span className='options' onClick={() => toggleOptions(index)}>&#8942;</span>
                            {(showOptions === index) && (
                                <div className="options-box">
                                    <button onClick={() => handleEdit(index)}>Edit</button>
                                    <button onClick={() => deleteTask(index)}>Delete</button>
                                </div>
                            )}
                        </div>
                        <span className='status'>{task.status}</span>
                    </div>
                ))
            )}
        </div>
    )
}
export default TaskBoxes;