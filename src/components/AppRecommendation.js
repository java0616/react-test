import React, { Component } from 'react';
import Slider from "react-slick";
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecommendation } from '../actions/feedActions';
import AOS from 'aos';
import 'aos/dist/aos.css';


export class AppRecommendation extends Component {

  componentWillReceiveProps(nextProps){

  }

  componentWillMount(){
    this.props.fetchRecommendation();
  }

  componentWillUpdate(){
  }

  render() {
  if(this.props.isLoading){
   return(
     <div >
     <p> Loading ... </p>
     </div>
   )
 }
 var feedItemsResult;
 if(this.props.items.length > 0){
  feedItemsResult = this.props.items.map( (feed,index) =>(
    <div key={feed.id.attributes['im:id']} data-aos='fade-left' data-aos-duration={(index+1) * 100}>
    <div className="col-12" ><img className="app-icon" alt={ feed['im:name'].label} src={feed['im:image'][2].label} /></div>
    <div className="col-12" ><p className="title" >{ feed['im:name'].label}</p></div>
    <div className="col-12" ><p>{ feed.category.attributes.label }</p></div>
    </div>
  ));
}else {
  feedItemsResult = <div>No Result</div>;
}
  const settings = {
      dots: false,
      infinite: false,
      speed: 100,
      slidesToShow: 5.5,
      slidesToScroll: 1,
      responsive: [
  {
    breakpoint: 991,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 1,
      infinite: false,
      dots: false
    }
  },
  {
    breakpoint: 767,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 3.5,
      slidesToScroll: 3
    }
  }
]
};

  return (
  <div>
  <div className="container">
    <h3 className="recomm-title" >推介</h3>
    </div>
    <div className="col p-0 " >
    <Slider {...settings}>
    {feedItemsResult}
    </Slider>
    </div>
    </div>
  );
}
}

AppRecommendation.propTypes = {
  fetchRecommendation:propTypes.func.isRequired,
  items:propTypes.array.isRequired,
};

const mapStateToProps = state => ({
  items: state.feeds.recommend,
  isLoading:state.feeds.isLoading
})

export default connect(mapStateToProps , { fetchRecommendation })(AppRecommendation);
