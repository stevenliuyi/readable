import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { PageHeader, Grid, Row, Col, Jumbotron } from 'react-bootstrap'
import { Nav, NavItem } from 'react-bootstrap'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { DropdownButton, MenuItem, Label } from 'react-bootstrap'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaEllipsisH from 'react-icons/lib/fa/ellipsis-h'

class App extends Component {
  render() {
    return (
      <Grid>
        <Col xsHidden md={1} />
        <Col xs={12} md={10}>
          <PageHeader>Readable</PageHeader>
          <Row>
            <Col xs={10}>
              <Nav bsStyle="pills">
                <NavItem eventkey="react">react</NavItem>
                <NavItem eventkey="redux">redux</NavItem>
                <NavItem eventkey="udacity">udacity</NavItem>
              </Nav>
            </Col>
            <Col xs={2}>
              <DropdownButton bsSize="small" bsStyle="primary" title="sort by">
                <MenuItem eventKey="score">score</MenuItem>
                <MenuItem eventKey="time">time</MenuItem>
              </DropdownButton>
            </Col>
          </Row>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col xs={11}>
                  <h2>Post title 1</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <p className="timestamp-text"><Label>author1</Label>&nbsp;&nbsp;&nbsp;08/29/2017</p>                  
                </Col>
                <Col xs={1}>
                  <div className="vote-arrow"><FaCaretUp size={30} /></div>
                  <div className="vote-score">5</div>
                  <div className="vote-arrow"><FaCaretDown size={30} /></div>
                </Col>
              </Row>
              <div className="detail-icon">
                <FaEllipsisH size={30} color={'grey'} />
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col xs={11}>
                  <h2>Post title 2</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <p className="timestamp-text"><Label>author2</Label>&nbsp;&nbsp;&nbsp;08/29/2017</p>                  
                </Col>
                <Col xs={1}>
                  <div className="vote-arrow"><FaCaretUp size={30} /></div>
                  <div className="vote-score">2</div>
                  <div className="vote-arrow"><FaCaretDown size={30} /></div>
                </Col>
              </Row>
              <div className="detail-icon">
                <FaEllipsisH size={30} color={'grey'} />
              </div>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col xsHidden md={1} />
      </Grid>
    );
  }
}

export default App;
