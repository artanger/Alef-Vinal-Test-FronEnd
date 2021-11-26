import React, { Component } from 'react'
import './App.css'
import {Container, Row, Col} from 'react-bootstrap'
import EditCode from './components/EditCode';
import AddCode from './components/AddCode';

class App extends Component {
  render() {
		return (
			<div className="App">
        <Container>
          <Row>
            <Col xs={8}> 
               <EditCode/>
            </Col>
            <Col xs={4}>
                <AddCode/>
            </Col>
          </Row>
        </Container>

			</div>
		)
	}
}

export default App;
