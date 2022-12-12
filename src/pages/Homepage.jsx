import React, {useState, useEffect} from 'react'

import ExerciseList from '../Components/ExerciseList';
import BaseFilter from '../Components/BaseFilter';

const Homepage = (props) => {
    const [exercises, setExercises] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('all');

    const  updateFilterHandler = (filter) => {
        setCurrentFilter(filter);
    }


    useEffect(() => {
        async function fetchExercises() {
            try {
                const response = await fetch('http://localhost:3111/exercises');
                const data = await response.json();
                console.log('fecthed');
                setExercises(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchExercises();
    }, [])


    const DeleteExerciseHandler = (id) => {
        const patchedExercises = exercises.filter(exercise => exercise.id !== id);
        setExercises(patchedExercises);
    }

    const toggleExerciseCompleteHandler = id => {
        const clonedExercises = [...exercises];
        const clickedExerciseIndex = clonedExercises.findIndex(exercise => exercise.id === id);
        const clickedExercise = clonedExercises[clickedExerciseIndex];
        clickedExercise.complete = !clickedExercise.complete;
        setExercises(clonedExercises);
    }

    let dataExercises = exercises;
    if (currentFilter === 'completed') {
        dataExercises = exercises.filter(exercise => exercise.complete )
    }
    else if (currentFilter === 'pending') {
        dataExercises = exercises.filter(exercise => !exercise.complete )
    }
    return (
        <div>
            <BaseFilter onUpdate={updateFilterHandler} filter={currentFilter}/>
            <ExerciseList exercises={dataExercises} onDeleteExercise={DeleteExerciseHandler} onToggleExercise={toggleExerciseCompleteHandler}/>
        </div>
    )
}

export default Homepage
