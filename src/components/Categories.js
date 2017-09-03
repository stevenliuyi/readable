import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'
import { Nav, NavItem } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'

class Categories extends Component {
  componentWillMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <Nav bsStyle="pills">
        <IndexLinkContainer to={"/"}>
          <NavItem active={ this.props.category === undefined }>
            all
          </NavItem>
        </IndexLinkContainer>

        { Array.isArray(this.props.categories) &&
            this.props.categories.map((cat) => (
              <IndexLinkContainer to={ `/${cat.path}` } key={ cat.name }>
                <NavItem active={ this.props.category === cat.name }>
                  { cat.name }
                </NavItem>
              </IndexLinkContainer>
            )) }
      </Nav>
    )
  }
}

const mapStateToProps = (state) => (
  { categories: state.categories }
)

export default connect(mapStateToProps, { fetchCategories })(Categories)
