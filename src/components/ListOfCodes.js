import React, { Component } from 'react'
import axios from 'axios'
class ListOfCodes extends Component {
    constructor(props) {
        super(props)

		this.state = {
            codes: [],
            id: '',
            value: '',
            name: ''
		}
    }

    getAllCodes(){
        axios.get('http://localhost:59477/api/home/getcodes')
        .then(response => {
            this.setState({codes:response.data});
        })
        .catch(error => {
            alert(error.message);
            console.log(error.message);
        });
    }
    componentDidMount(){
        this.getAllCodes();
    }
    handleClick (code) {    
        this.setState({
            id: code.id,
            value: code.value,
            name: code.name
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const bodyParams = {
            id: this.state.id, value: this.state.value, name: this.state.name
        }
        axios
            .post('http://localhost:59477/api/home/editcode', bodyParams, {
                headers: headers
            })
            .then(response => {
                this.setState({ id: '', name: '', value: '' });
                this.getAllCodes();
                console.log(response)
            })
            .catch(error => {
                alert(error.response.data);
                console.log(error.response.data)
            });
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const{codes, id, value, name} = this.state;
        return (
            <div>
                <h1>Edit Codes:</h1>
                <form onSubmit={this.submitHandler}>
                    <div>
						<input
							type="text"
							name="id"
							value={id}
							onChange={this.changeHandler}
						/>
					</div>
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
					
					<button type="submit" >Change</button>
				</form>

                <table>
                    <thead>
                        <tr>    
                            <td>Values</td>
                            <td>Name</td>
                        </tr>
                    </thead>
                    <tbody>
                        {codes.map(code =>
                              <tr key={code.id} onClick={()=>{this.handleClick(code)}} >
                                  <td>{code.value}</td>
                                  <td>{code.name}</td>
                              </tr>
                            )}
                    </tbody>
                </table> 
                <hr/>
            </div>
        )
    }
}
export default ListOfCodes