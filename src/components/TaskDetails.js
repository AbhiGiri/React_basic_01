import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "./Button";

function TaskDetails() {
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState({});
    const [error, setError] = useState(null);

    const params = useParams();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch(`http://localhost:5000/tasks/${params.id}`);
            const data = await res.json();
            
            if(res.status === 404) {
                // setError('Task not found.')
                navigate('/')
            }
            setTask(data);
            setLoading(false);
        }
        fetchTask();
    }, [navigate, params.id]) 


    return loading ? (
        <h3>Loading...</h3>
    ) : (
        <div>
            <p>{pathname}</p>
            <h3>{task.task}</h3>
            <p>{task.day}</p>
            <Button onClick={() => navigate(-1)} text='Go Back'/>
        </div>
    )
}

export default TaskDetails


