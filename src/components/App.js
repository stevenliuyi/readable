import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories } from '../actions'
import { Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap'
import ListPosts from './ListPosts'
import Categories from './Categories'
import PostDetail from './PostDetail'
import SortButton from './SortButton'

class App extends Component {
  componentWillMount() {
    this.props.fetchPosts()
    this.props.fetchCategories()
  }

  render() {
    return (
      <Grid>
        <Col xsHidden md={1} />
        <Col xs={12} md={10} className="no-padding">
          <PageHeader>Readable</PageHeader>
          { /* match root, category or post detail paths */ }
          <Route exact path="/([^/]*)(/[^/]*)?" render={ () => (
            <div>
              <Row className="category-bar">
                <Col xs={12} sm={9}>
                  <Route exact path="/" render={ () =>
                    <Categories />
                    } />
                  <Route exact path="/:category" render={ ({match}) => 
                    <Categories category={ match.params.category } />
                    } />
                  <Route exact path="/:category/:post_id" render={ () =>
                    <Categories />
                    } />
                </Col>
                <Col xs={12} sm={3}>
                  <Route exact path="/([^/]*)" render={ () =>
                    <SortButton entity="post" />
                  } />
                  <Route exact path="/:category/:post_id" render={ () =>
                    <SortButton entity="comment" />
                  } />
                </Col>
              </Row>
              <Route exact path="/" render={ () =>
                <ListPosts />
                } />
              <Route exact path="/:category" render={ ({match}) => 
                <ListPosts category={ match.params.category } />
                } />
              <Route exact path="/:category/:post_id" render={ ({match}) =>
                <PostDetail post_id={ match.params.post_id } />
              } />
            </div>
          )} />
        </Col>
        <Col xsHidden md={1} />
      </Grid>
    );
  }
}


const mapStateToProps = ({ categories }) => (
  { categories }
)

export default connect(mapStateToProps,
  { fetchPosts, fetchCategories }, null, {
  pure: false // allow react router to update view
})(App);
