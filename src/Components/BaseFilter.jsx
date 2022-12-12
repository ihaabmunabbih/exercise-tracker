import React from 'react';

import './BaseFilter.css';


function BaseFilter(props) {
    return (
        <nav className="filter-nav">
            <button
                onClick={() => props.onUpdate('all')}
                className={props.filter === 'all' ? 'active' : ''}
            >
                View All
            </button>
            <button
                onClick={() => props.onUpdate('completed')}
                className={props.filter === 'completed' ? 'active' : ''}
            >
                Completed
            </button>
            <button
                onClick={() => props.onUpdate('pending')}
                className={props.filter === 'pending' ? 'active' : ''}
            >
                Pending
            </button>
        </nav>
    )
}

export default BaseFilter
