import React, {Component} from "react"
import axios from 'axios'

class AddCode extends Component {
	constructor(props) {
		super(props)

		this.state = {
            value: '',
			name: '',
			hasError: false,
			errorList: []
		}
	}

	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value, hasError: false })
	}

	submitHandler = (e) => {
		e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
		axios
            .post('http://localhost:59477/api/home/addcode', this.state, {
                headers: headers
            })
            .then(response => {
                this.setState({ name: '', value: '' });
				console.log(response);
				
				var btnRefresh = document.getElementById('btnRefresh');
				btnRefresh.click();
            })
            .catch(error => {
				var errList = [];
				Object.getOwnPropertyNames(error.response.data.errors)
					.forEach(function (val) {
						var currentElemErrors = error.response.data.errors[val];
						for (let i = 0; i < currentElemErrors.length; i++) {
							errList.push(currentElemErrors[i]);
						  }
					})
				if(errList.length > 0){
					this.setState({ hasError: true, errorList: errList });
				}
				console.log(errList);
            });
	}

	render() {
		const { name, value, hasError, errorList } = this.state
		return (
			<div className="bd-example">
                <h1>Add Codes:</h1>
				<form onSubmit={this.submitHandler}>
					<div className="row mb-3"> 
						<label htmlFor="value" className="col-sm-2 col-form-label">Value</label>
						<div className="col-sm-10">
							<input
								type="text"
								name="value"
								maxLength="3"
								className="form-control"
								value={value}
								onChange={this.changeHandler}
							/>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
						<div className="col-sm-10">
							<input
								type="text"
								name="name"
								max-length="50"
								className="form-control"
								value={name}
								onChange={this.changeHandler}
							/>
						</div>
					</div>
					<button type="submit" className={value !== '' && name !== '' ? 'btn btn-primary' : 'btn btn-primary disabled'}>
						Add
					</button>
				</form>
				<br/>
				<div style={hasError ? {} : { display: 'none' }} className="alert alert-danger" role="alert">
					<ul>{errorList.map((errorListMessage, index) =>	<li key={index}>{errorListMessage}</li>)}</ul>
				</div>
			</div>
		)
	}
}

export default AddCode