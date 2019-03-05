import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../loader/loader.js';

import "./information.css";
	
class Information extends Component {
	constructor(props){
		super(props);
		this.state = {
			data : {},
			loginOrUsername: this.props.loginOrUsername,
			nameValue : '',
			usernameValue : '',
			cityValue : '',
			streetValue : ''
		};
	}

	componentDidMount () {
		fetch(`http://jsonplaceholder.typicode.com/users`)
			.then(res => res.json())
			.then(data => this.setState({ data }))
			.catch(err => err);
	}	

	sendRequest = (e) => {
		e.preventDefault();
		const { data, nameValue, usernameValue, cityValue, streetValue } = this.state;
			fetch('http://jsonplaceholder.typicode.com/users', {
		    method: 'POST',
		    body: JSON.stringify({
		      name: nameValue,
		      username: usernameValue,
		      address : {
		      	city: cityValue,
		      	street: streetValue
		      }
		      
		    }),
		    headers: {
		      "Content-type": "application/json; charset=UTF-8"
		    }
	  	})
		 	.then(response => response.json())
		 	.then(json => this.setState({ data : data.concat(json) }))
			.catch(err => err);
	
		setTimeout(() => {
			this.setState({
				nameValue: "",
				usernameValue: "",
				cityValue: "",
				streetValue: ""
			})
		},0)
	}

	changeNameRef = React.createRef();
	changeUsernametRef = React.createRef();
	changeCityRef = React.createRef();
	changeStreetRef = React.createRef();

	handleChange = ({ target : {value} }) => {
		this.setState({
		  nameValue : this.changeNameRef.current.value,
		  usernameValue : this.changeUsernametRef.current.value,
		  cityValue : this.changeCityRef.current.value,
		  streetValue : this.changeStreetRef.current.value
		})
	}

	render () {
		const { data, nameValue, usernameValue, cityValue, streetValue } = this.state;
		return (
			<div>
				<header>
					<h3 className="userNameValue">{ `Hello, ${ this.props.userNameValue }`}</h3>
					<Link to="/" style={{ textDecoration: 'none' }}>
						<button
							onClick={ this.props.clickLogout } 
							className="btnInfo btn btn-light"
						>
							Logout						
						</button>
					</Link>
				</header>
				<div className="table-responsive">
					<table className="table table-hover">
						<thead className="thead-dark">
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Username</th>
								<th scope="col">City</th>
								<th scope="col">Street</th>
							</tr>
						</thead>
						<tbody>
							{
								data.length
									? data.map(({ id, name, username, address : { city , street } }) => (
										<tr key={ id }>
											<td key={ id+"a" }>{ name }</td>
											<td key={ id+"b" }>{ username }</td>
											<td key={ id+"d" }>{ city }</td>
											<td key={ id+"e" }>{ street }</td>
										</tr>
									))
									: <Loader />
							}
						</tbody>
					</table>
				</div>	
				<form className="sendForm" onSubmit={ this.sendRequest }>
					<button className="btn btn-light addNewBtn">
						Add new
					</button>
						<input ref={ this.changeNameRef } 
							required className="addNew" 
							type="text" placeholder="Name" 
							onChange={ this.handleChange } value={ nameValue }
						/>
						<input ref={ this.changeUsernametRef } 
							required className="addNew" type="text" placeholder="Username" 
							onChange={ this.handleChange } value={ usernameValue }
						/>
						<input ref={ this.changeCityRef } required className="addNew" 
							type="text" placeholder="City" 
							onChange={ this.handleChange } value={ cityValue }
						/>
						<input ref={ this.changeStreetRef } 
							required className="addNew"
							type="text" placeholder="Street" 
							onChange={ this.handleChange } value={ streetValue }
						/>
				</form>
			</div>	
		)
	}
}

export default Information;	