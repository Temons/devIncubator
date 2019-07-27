import React from 'react';
import './app-header.css';

const AppHeader = ({ toDo, done }) =>{
	return (
			<div className = 'app-header col-3'>
				<h1>ToDo</h1>
				<h2>{ toDo } more to do, { done } done</h2>
			</div>
		);
};

export default AppHeader;