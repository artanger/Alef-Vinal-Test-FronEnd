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
            errorMessageList: '',
            hasError: false,
            errorList: []
		}

        this.getAllCodes = this.getAllCodes.bind(this);
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
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value, hasError: false });
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
                var errList = [];
                if(typeof error.response.data === 'string'){
                    errList.push(error.response.data);
                }
                else if(error.response.data.errors){
                    Object.getOwnPropertyNames(error.response.data.errors)
					.forEach(function (val) {
						var currentElemErrors = error.response.data.errors[val];
						for (let i = 0; i < currentElemErrors.length; i++) {
							errList.push(currentElemErrors[i]);
						  }
					})
                }
				
				if(errList.length > 0){
					this.setState({ hasError: true, errorList: errList });
				}
				console.log(errList);
            });
    }

    render() {
        const{codes, id, value, name, hasError, errorList} = this.state;

        return (
            <>
            <div className="row">
                <div className="bd-example col-md-6">
                    <h1>Edit Codes:</h1>
                    <form onSubmit={this.submitHandler}>
                        <div className="row mb-3">
                            <label htmlFor="id" className="col-sm-2 col-form-label">Id</label>
                            <div className="col-sm-10">
                                <input
                                        className="form-control"
                                        type="text"
                                        name="id"
                                        readOnly
                                        value={id}
                                        onChange={this.changeHandler}
                                />
                         </div>
                          
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="value" className="col-sm-2 col-form-label">Values</label>
                                <div  className="col-sm-10">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="value"
                                        maxLength="3"
                                        value={value}
                                        onChange={this.changeHandler}
                                    />
                                </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10" >
                                <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        max-length="50"
                                        value={name}
                                        onChange={this.changeHandler}
                                />
                            </div>       
                        </div>
                        <button type="submit" className={id !== '' && value !== '' && name !== '' ? 'btn btn-success' : 'btn btn-success disabled'}>Change</button>                        
                    </form>
                    <br/>
                    <div style={hasError ? {} : { display: 'none' }} className="alert alert-danger" role="alert">
				        <ul>{errorList.map((errorListMessage, index) =>	<li key={index}>{errorListMessage}</li>)}</ul>
				    </div>
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
                    <button id="btnRefresh" onClick={this.getAllCodes} style={{display: 'none'}}>refresh list</button>
                </div>
            </div>
            
            </>
        )
    }
}
export default EditCode