import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'
import { Nav, NavItem } from 'react-bootstrap'

class Categories extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCategories())
  }

  render() {
    return (
      <Nav bsStyle="pills">
        { Array.isArray(this.props.categories) &&
            this.props.categories.map((cat) => (
              <NavItem eventKey={ cat.name }>{ cat.name }</NavItem>
            )) }
      </Nav>
    )
  }
}

const mapStateToProps = (state) => (
  { categories: state.categories }
)

export default connect(mapStateToProps)(Categories)
