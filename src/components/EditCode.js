import React, { Component } from 'react'
import axios from 'axios'
class EditCode extends Component {
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
            <>
            <div class="row">
                <div class="bd-example col-md-6">
                    <h1>Edit Codes:</h1>
                    <form onSubmit={this.submitHandler}>
                        <div class="row mb-3">
                            <input
                                class="form-control"
                                type="text"
                                name="id"
                                value={id}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <div class="row mb-3">
                            <input
                                class="form-control"
                                type="text"
                                name="value"
                                maxLength="3"
                                value={value}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <div class="row mb-3">
                            <input
                                class="form-control"
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <button type="submit" class="btn btn-success">Change</button>
                    </form>

                </div>
                <div class="bd-example col-md-6 ">
                    <table class="table table-striped table-hover ">
                        <thead>
                            <tr>    
                                <th scope="col">Values</th>
                                <th scope="col">Name</th>
                            </tr>
                        </thead>
                        <tbody class=" my-custom-scrollbar" >
                            {codes.map(code =>
                                <tr class="" key={code.id} onClick={()=>{this.handleClick(code)}} >
                                    <td>{code.value}</td>
                                    <td>{code.name}</td>                                 
                                </tr>
                                )}
                        </tbody>
                    </table> 

                </div>
              
               
            </div>
            
            </>
        )
    }
}
export default EditCode