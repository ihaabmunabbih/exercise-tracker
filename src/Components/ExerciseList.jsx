import React from 'react'

import './ExerciseList.css';

import ExerciseItem from './ExerciseItem';

function ExerciseList(props) {
    if(props.exercises.length === 0) return null; 
    return (
        <div className="exercises-list">
            {props.exercises.map(exercise => 
               <ExerciseItem key={exercise.id} exercise={exercise} onDeleteExercise={props.onDeleteExercise} onToggleExercise={props.onToggleExercise}/> 
            )}
        </div>
    )
}

export default ExerciseList
