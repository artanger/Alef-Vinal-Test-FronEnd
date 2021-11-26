import React, { Component } from 'react'
import './App.css'
import {Container, Row, Col} from 'react-bootstrap'
import Home from './components/Home';
import ListOfCodes from './components/ListOfCodes';

class App extends Component {
  render() {
		return (
			<div className="App">
        <Container>
          <Row>
            <Col> 
              <Home/>
            </Col>
            <Col xs={6}>
              <ListOfCodes/>
            </Col>
          </Row>
        </Container>
			</div>
		)
	}
}

export default App;
