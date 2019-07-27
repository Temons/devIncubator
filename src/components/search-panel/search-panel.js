import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {

	

	state = {
		term : ''
	}

	onSearchChange = (e) => {
		const term = e.target.value;
		this.setState({ term })
		this.props.onSearch(term)
		}


	render() {

		const searchText = 'Type here to search'

		return (
			<input className = 'search-input' 
				placeholder = { searchText }
				onChange = { this.onSearchChange }/>
			)
	}
	
};
