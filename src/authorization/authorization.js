import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const LoginPassword = ({ onClick, loginOrUsername, passwordValue, loginValue, onchangeLogin, onchangePassword }) => (
	<Fragment>
		<section className="container" style={{maxWidth:"300px",marginTop:'50px'}}>
			<form onSubmit={(e) => {e.preventDefault()}}>
				<h3>Login to</h3>
				<div class="input-group mb-3">
					<input 
						className="form-control"
						required
						type="text"
						placeholder="Login"
						value={ loginValue }
						onChange={ onchangeLogin }
					/>
				</div>
				<div class="input-group mb-3">	
					<input 
						className="form-control"
						required
						type="password"
						placeholder="Password"
						value={ passwordValue }
						onChange={ onchangePassword }
					/>
				</div>
				<button 
					onClick={ onClick } 
					className="UserNameBtn btn btn-secondary btn-lg btn-block">
					Login
				</button>
			</form>	
		</section>	
	</Fragment>
)

export const UserName = ({ value, onChange }) => (
	<section className="container" style={{maxWidth:"300px",marginTop:'50px'}}>
			<div class="input-group mb-3">
				<input 
					maxLength="30"
					autoFocus
					className="form-control"
					type="text"
					placeholder="Username"
					onChange={ onChange }
					value={ value }
				/>
			</div>
			<Link 
				style={{color:"#fff",textDecoration: 'none'}} 
				to={ value ? "/information" : "/" }
			>
				<button className="btn btn-secondary btn-lg btn-block">
					View home page
				</button>
			</Link>
	</section>	
)
