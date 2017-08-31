import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories, updateOrderMethod } from '../actions'
import { Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import ListPosts from './ListPosts'
import Categories from './Categories'

class App extends Component {
  componentWillMount() {
    this.props.dispatch(fetchPosts())
    this.props.dispatch(fetchCategories())
  }

  order_methods = ['highest votes',
                   'lowest votes',
                   'most recent',
                   'oldest']
  
  render() {
    return (
      <Grid>
        <Col xsHidden md={1} />
        <Col xs={12} md={10}>
          <PageHeader>Readable</PageHeader>
          { /* root or category paths */ }
          <Route exact path="/([^/]*)" render={ () => (
            <div>
              <Row className="category-bar">
                <Col xs={10}>
                  <Route exact path="/" render={ () =>
                    <Categories />
                    } />
                  <Route exact path="/:category" render={ ({match}) => 
                    <Categories category={ match.params.category } />
                    } />
                </Col>
                <Col xs={2}>
                  <DropdownButton bsSize="small" bsStyle="primary" title="sort posts">
                    {
                      this.order_methods.map(order_method =>
                        <MenuItem onClick={ () =>
                            this.props.dispatch(updateOrderMethod(order_method)) }>
                          { order_method }
                        </MenuItem>
                      )
                    }
                  </DropdownButton>
                </Col>
              </Row>
              <Route exact path="/" render={ () =>
                <ListPosts />
                } />
              <Route exact path="/:category" render={ ({match}) => 
                <ListPosts category={ match.params.category } />
                } />
            </div>
          )} />
        </Col>
        <Col xsHidden md={1} />
      </Grid>
    );
  }
}


const mapStateToProps = (state) => (
  { categories: state.categories }
)

export default connect(mapStateToProps, null, null, {
  pure: false // allow react router to update view
})(App);
