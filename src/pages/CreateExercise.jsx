import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


import './CreateExercise.css';

function CreateExercise() {
    const [exercise, setExercise] = useState({
        title: '',
        details: '',
    });

    const [date, setDate] = React.useState(new Date());

    const history = useHistory();

    const {id}  = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newExercise = {
            title: exercise.title,
            details: exercise.details,
            complete: false,
            date: date,
            id: Math.floor(Math.random() * 10000)
        }
        fetch('http://localhost:3111/exercises', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newExercise)
        }).then(() => {
            history.push('/home');
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleChange = (e) => {
        setExercise({
            ...exercise,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        if (typeof id !== 'undefined') {
            fetch(`http://localhost:3111/exercises/${id}`)
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    setExercise({
                        title: data.title,
                        details: data.details
                    })
                })
        }
        else {
            setExercise({
                title: "",
                details: ""
            })
        }
    }, [id])
    
    const handleEditSubmit = (e) => {
        e.preventDefault();
        const newExercise = {
            title: exercise.title,
            details: exercise.details,
            complete: false,
            date: date,
            id: Math.floor(Math.random() * 10000)
        }
        fetch(`http://localhost:3111/exercises/${id}`, {
            method: 'PUT',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newExercise)
        }).then(() => {
            history.push('/home');
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Box>
            <label>{typeof id !== 'undefined' ? "Edit" : "Create"} Exercise</label>
            <form onSubmit={typeof id !== 'undefined' ? handleEditSubmit : handleSubmit}>
                <label>Title</label>
                <input 
                    type="text"
                    name="title"
                    value={exercise.title}
                    onChange={handleChange}
                    required
                />
                <label>Tanggal</label>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker style={{fontSize:'18px'}}
                            // label="Basic example"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <label>Details</label>
                <textarea 
                    name="details"
                    cols="30"
                    rows="10"
                    value={exercise.details}
                    onChange={handleChange}
                    required  
                ></textarea>
                <button type="submit">{typeof id !== 'undefined' ? "Edit" : "Add"} Exercise</button>
            </form>
        </Box>
    )
}

export default CreateExercise
