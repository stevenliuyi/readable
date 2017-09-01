import React, { Component } from 'react' 
import { connect } from 'react-redux'
import { updateOrderMethod } from '../actions'
import { DropdownButton, MenuItem } from 'react-bootstrap'

class SortButton extends Component {
  
  order_methods = ['highest votes',
                   'lowest votes',
                   'most recent',
                   'oldest']

  render() {
    return (
      <DropdownButton bsSize="small" bsStyle="primary" title={ `sort ${this.props.entity}s` }>
        {
          this.order_methods.map(order_method =>
            <MenuItem onClick={ () =>
                this.props.dispatch(updateOrderMethod(order_method)) }>
              { order_method }
            </MenuItem>
          )
        }
      </DropdownButton>
    )
  }
}

export default connect()(SortButton)
