import React, {Component} from "react"
import axios from 'axios'
class Home extends Component {
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
			<div>
                
                <h1>Add Codes:</h1>
				<form onSubmit={this.submitHandler}>
					<div>
						<input
							type="text"
							name="value"
                            maxLength="3"
							value={value}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<input
							type="text"
							name="name"
							value={name}
							onChange={this.changeHandler}
						/>
					</div>
					
					<button type="submit">Add</button>
				</form>
			</div>
            
		)
	}
}

export default Home