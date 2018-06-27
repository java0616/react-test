import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFeed } from '../actions/feedActions';
import InfiniteScroll from 'react-infinite-scroll-component';
import AOS from 'aos';
import 'aos/dist/aos.css';


  export class AppList extends Component {
    state = {
      items: [],
      hasMore: true
    };

    constructor() {
      super();
       this.hasMore = true;
       this.items  = [];
    }

    componentWillMount(){
      this.props.fetchFeed();
    }

     componentDidMount(){
     AOS.init({
        duration : 2000
     })
    }

    componentWillReceiveProps(nextProps){

  }

  fetchMoreData = () => {
    if(this.props.items){
    if (this.state.items.length >= 100) {
      this.setState({ hasMore: false });
      return;
    }

    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 500);
    }
  };


  render() {
    if(this.props.isLoading){
     return(
       <div >
       <p> Loading ... </p>
       </div>
     )
   }




   var feedList;

   if(this.props.items.length > 0){
    feedList = this.props.items.map( (feed,index) =>(
      <div key={feed.id.attributes['im:id']} data-aos='fade-up' data-aos-duration={(index+1) * 100}>
        <ListItem>
        <div className="app-id" >{index+1}</div>
        <img alt={feed['im:name'].label} className={( (index+1) % 2 ? 'odd' : 'even')} src={feed['im:image'][0].label} />
        <ListItemText primary={ feed['im:name'].label} secondary={ feed.category.attributes.label} />
        <a className="btn btn-outline-primary" target="_blank" href={ feed.link.attributes.href} > More Details</a>
        </ListItem>
        <li>
          <Divider  />
        </li>
      </div>
    ));

  }else {
    feedList = <div>No Result</div>;
  }



    return (
      <div className="container">
      <List>
      {feedList}
      </List>
      </div>

    );
  }
}

AppList.propTypes = {
  fetchFeed:propTypes.func.isRequired,
  items:propTypes.array.isRequired,
};

const mapStateToProps = state => ({
  items: state.feeds.items,
  isLoading:state.feeds.isLoading,
})

export default connect(mapStateToProps , { fetchFeed })(AppList);
