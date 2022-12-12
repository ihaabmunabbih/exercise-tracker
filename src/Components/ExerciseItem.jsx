import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import './ExerciseItem.css'
function ExerciseItem(props) {
    const onDelete = () => {
        fetch(`http://localhost:3111/exercises/${props.exercise.id}`, {
            method: 'DELETE',
        })
        .then (() => {
            props.onDeleteExercise(props.exercise.id);
        })
        .catch(error => console.log(error));
    }

    const onToggle = () => {
        fetch(`http://localhost:3111/exercises/${props.exercise.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({complete: !props.exercise.complete})
        }).then(() => {
            props.onToggleExercise(props.exercise.id);
        }).catch(error => console.log(error));
    }

    const classes = ['exercise']
    if (props.exercise.complete) {
        classes.push('complete')
    }
    return (
        <div className={classes.join(' ')}>
            <div className="actions">
                <h4>{props.exercise.title}</h4>
                <div className="buttons">
                    <button onClick={onDelete}>Delete</button>
                    <Link to={`/exercise/${props.exercise.id}/edit`}>Edit</Link>
                    <button onClick={onToggle}>Toggle</button>
                </div>
            </div>
            <label>{props.exercise.date ? format(new Date(props.exercise.date), 'yyyy/MM/dd') : ""}</label>
            <div className="details">
                <p>{props.exercise.details}</p>
            </div>
        </div>
    )
}

export default ExerciseItem
