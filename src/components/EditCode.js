import React, { Component } from 'react'
import axios from 'axios'
class EditCode extends Component {
    constructor(props) {
        super(props)

		this.state = {
            codes: [],
            id: '',
            value: '',
            name: '',
            errorMessageList: ''
		}
    }

    getAllCodes(){
        axios.get('http://localhost:59477/api/home/getcodes')
        .then(response => {
            this.setState({codes:response.data});
        })
        .catch(error => {
            this.setState({errorMessageList:error.message});
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
        const{codes, id, value, name, errorMessageList} = this.state;

        return (
            <>
            <div className="row">
                <div className="bd-example col-md-6">
                    <h1>Edit Codes:</h1>
                    <form onSubmit={this.submitHandler}>
                        <div className="row mb-3">
                            <input
                                className="form-control"
                                type="text"
                                name="id"
                                readOnly
                                value={id}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <div className="row mb-3">
                            <input
                                className="form-control"
                                type="text"
                                name="value"
                                maxLength="3"
                                value={value}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <div className="row mb-3">
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                max-length="50"
                                value={name}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <button type="submit" 
                        className={value !== '' || name !== '' ? 'btn btn-success' : 'btn btn-success disabled'}
                        >Change</button>
                    </form>

                </div>
                <div className="bd-example col-md-6">
                    <div className="table-fix-head">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>    
                                    <th scope="col">Values</th>
                                    <th scope="col">Name</th>
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
                    </div>
                    <div style={errorMessageList !== '' ? {} : { display: 'none' }} className="alert alert-danger" role="alert">{errorMessageList}</div>
                </div>
            </div>
            
            </>
        )
    }
}
export default EditCode