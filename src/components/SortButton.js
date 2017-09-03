import React, { Component } from 'react' 
import { connect } from 'react-redux'
import { updatePostsOrder, updateCommentsOrder } from '../actions'
import { DropdownButton, MenuItem } from 'react-bootstrap'

class SortButton extends Component {
  
  order_methods = ['highest votes',
                   'lowest votes',
                   'most recent',
                   'oldest']

  sort = (order_method) => {
    if (this.props.entity === 'post') {
      this.props.updatePostsOrder(order_method)
    }
    if (this.props.entity === 'comment') {
      this.props.updateCommentsOrder(order_method)
    }
  }
  render() {
    return (
      <DropdownButton bsSize="small" bsStyle="primary" title={ `sort ${this.props.entity}s` }>
        {
          this.order_methods.map(order_method =>
            <MenuItem onClick={ () => this.sort(order_method) }>
              { order_method }
            </MenuItem>
          )
        }
      </DropdownButton>
    )
  }
}

export default connect(null, {
  updatePostsOrder,
  updateCommentsOrder })(SortButton)
