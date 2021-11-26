import React, {Component} from "react"
import axios from 'axios'
class AddCode extends Component {
	constructor(props) {
		super(props)

		this.state = {
            value: '',
			name: ''	
		}
	}

	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value })
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
            })
            .catch(error => {
                console.log(error)
            });
	}

	render() {
		const { name, value } = this.state
		return (
			<div class="bd-example">
                <h1>Add Codes:</h1>
				<form onSubmit={this.submitHandler}>
					<div class="row mb-3"> 
						<label for="value" class="col-sm-2 col-form-label">Value</label>
						<div class="col-sm-10">
							<input
								type="text"
								name="value"
								maxLength="3"
								class="form-control"
								value={value}
								onChange={this.changeHandler}
							/>
						</div>
					</div>
					<div class="row mb-3">
						<label for="name" class="col-sm-2 col-form-label">Name</label>
						<div class="col-sm-10">
							<input
								type="text"
								name="name"
								class="form-control"
								value={name}
								onChange={this.changeHandler}
							/>
						</div>
					</div>
					<button type="submit" class="btn btn-primary">Add</button>
				</form>
			</div>
		)
	}
}

export default AddCode