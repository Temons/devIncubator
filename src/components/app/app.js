import React, { Component } from 'react';
import AppHeader from '../app-header/app-header.js';
import SearchPanel from '../search-panel/search-panel.js';
import TodoList from '../todo-list/todo-list.js';
import ItemStatusFilter from '../item-status-filter/item-status-filter.js';
import ItemAddForm from '../item-add-form/item-add-form.js'
import './app.css';

export default class App extends Component {

	maxId = 100;

	state = {
		todoData : [
			this.createTodoItem('Drink Water'),
			this.createTodoItem('Do Sport'),
			this.createTodoItem('Make Awesome App'),
			this.createTodoItem('Smile'),
		],
		term : '',
		filter: 'all'
	}

	createTodoItem(label){
		return{
			label: label,
			important: false,
			done: false,
			id: this.maxId++,
			date: new Date().toLocaleString()
		}
	}

	addItem = (text) => {
		const newItem = this.createTodoItem(text);

		this.setState(({ todoData }) =>{
			const newArr = [
			...todoData,
			newItem
			]

			return {
				todoData: newArr
			};
		});
	}

	searchItem = (term) => {
		this.setState({ term })
	}

	onFilterChange = (filter) => {
		this.setState({ filter })
	}

	search (items, term) {
		if(term.length === 0){
			return items
		}

		return items.filter((item) =>{
			return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
		})
	}

	filter(items, filter) {
		switch(filter){
			case 'all':
				return items;
			case 'active': 
				return items.filter((item) => !item.done);
			case 'done' :
				return items.filter((item) => item.done);
			default : return items;
		}
	}

	onToggleProperty (arr, id, propName){
		const idx = arr.findIndex((el) => el.id === id);

		const oldItem = arr[idx];
		const newItem = {...oldItem, 
						[propName]: !oldItem[propName]};

		return [ ...arr.slice(0, idx), 
						newItem,
						...arr.slice(idx+1)
						]
	}

	onToggleDone = (id) =>{
		this.setState(({ todoData }) =>{
			return {
				todoData : this.onToggleProperty(todoData, id, 'done')
			}
		})
	}

	onToggleImportant = (id) =>{
		this.setState(({ todoData }) =>{
			return {
				todoData : this.onToggleProperty(todoData, id, 'important')
			}
		})
	}

	deleteItem = (id) => {
		this.setState(({todoData}) =>{
			const idx = todoData.findIndex((el) => el.id === id);
			const newArray =[ ...todoData.slice(0, idx), 
							...todoData.slice(idx+1)
							]
			return {
				todoData : newArray
			}
		})
	}
	render() {
		const { todoData, term, filter } = this.state;
		const visibleItems = this.filter(
							this.search(todoData, term), filter);
		const doneCount = todoData.filter((el) => el.done).length;
		const todoCount = todoData.length - doneCount;
		return(
			<div className="todo-app container">
				<div className="row">
					<AppHeader toDo = {todoCount} done = {doneCount} />
					<div className = 'main col-9'>
						<div className="top-panel d-flex">
						<SearchPanel 
							onSearch = {this.searchItem}/>
						<ItemStatusFilter 
							filter = { filter }
							onFilterChange = {this.onFilterChange}/>
					</div>
					<TodoList 
						todos = {visibleItems}
						onDeleted = {this.deleteItem}
						onToggleDone = {this.onToggleDone}
						onToggleImportant = {this.onToggleImportant}/>
					<ItemAddForm 
						onItemAdded = {this.addItem}/>
					</div>
					
				</div>
			</div>
		)
	}
	
}