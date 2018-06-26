import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchFeedResult } from '../actions/feedActions';


export class AppSearch extends Component {
  constructor(props) {
    super(props);
    this.state ={
      keyword: '',
      isInputing: true,
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.props.searchFeedResult(e.target.value)
  }

  render() {
      return (
        <div className="container">
        <form>
        <input type="text" name="keyword" className="form-control keyword" placeholder="搜尋" onChange={this.onChange} />
        </form>
        {this.state.keyword}
      </div>
    );
  }

}

AppSearch.propTypes = {
  searchFeedResult:propTypes.func.isRequired
};



export default connect(null , { searchFeedResult })(AppSearch);
