import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import ListPosts from './ListPosts'
import Categories from './Categories'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts())
  }
  
  render() {
    return (
      <Grid>
        <Col xsHidden md={1} />
        <Col xs={12} md={10}>
          <PageHeader>Readable</PageHeader>
          <Row>
            <Col xs={10}>
              <Categories />
            </Col>
            <Col xs={2}>
              <DropdownButton bsSize="small" bsStyle="primary" title="sort by">
                <MenuItem eventKey="score">score</MenuItem>
                <MenuItem eventKey="time">time</MenuItem>
              </DropdownButton>
            </Col>
          </Row>
          <ListPosts />
        </Col>
        <Col xsHidden md={1} />
      </Grid>
    );
  }
}

export default connect()(App);
