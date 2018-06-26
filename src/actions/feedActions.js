import { FETCH_APP_FEEDS, FETCH_APP_RECOMM_FEEDS, FETCH_APP_SEARCH_RESULT} from "./types"


export const fetchFeed = (keyword) => dispatch => {
    if(keyword){
      if(keyword !== ''){
      fetch('https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json')
      .then(res => res.json())
      .then(feeds =>  {

        this.result = feeds.feed.entry.filter(function(item){           
          if(item['im:name'].label.indexOf(keyword) !== -1 || item['im:artist'].label.indexOf(keyword) !== -1   || item['category'].attributes.label.indexOf(keyword) !== -1  || item['summary'].label.indexOf(keyword) !== -1  )
          return item
        });
        dispatch({
        type:FETCH_APP_FEEDS,
        payload: this.result,
        isLoading: false
      })
    })
  }else {
    fetch('https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json')
    .then(res => res.json())
    .then(feeds => dispatch({
      type:FETCH_APP_FEEDS,
      payload: feeds.feed.entry,
      isLoading: false
    }))
  }

  }else {
    fetch('https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json')
    .then(res => res.json())
    .then(feeds => dispatch({
      type:FETCH_APP_FEEDS,
      payload: feeds.feed.entry,
      isLoading: false
    }))
  }
}

export const fetchRecommendation = (keyword) => dispatch => {
  if(keyword){
    if(keyword !== ''){


      fetch('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json')
      .then(res => res.json())
      .then(feeds => {
        console.log(feeds);
        this.result = feeds.feed.entry.filter(function(item){ 
          if(item['im:name'].label.indexOf(keyword) !== -1 || item['im:artist'].label.indexOf(keyword) !== -1   || item['category'].attributes.label.indexOf(keyword) !== -1  || item['summary'].label.indexOf(keyword) !== -1  )
          return item
        });
        dispatch({
        type:FETCH_APP_RECOMM_FEEDS,
        payload:  this.result,
        isLoading: false
      })
    })
    }else {
      fetch('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json')
      .then(res => res.json())
      .then(feeds => dispatch({
        type:FETCH_APP_RECOMM_FEEDS,
        payload: feeds.feed.entry,
        isLoading: false
      }))
    }
    }else {
      fetch('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json')
      .then(res => res.json())
      .then(feeds => dispatch({
        type:FETCH_APP_RECOMM_FEEDS,
        payload: feeds.feed.entry,
        isLoading: false
      }))
    }
}

export const searchFeedResult = (keyword) => dispatch => {
    dispatch({
      type:FETCH_APP_SEARCH_RESULT,
      payload: keyword,
    })
    return dispatch(fetchFeed(keyword)),dispatch(fetchRecommendation(keyword));
}
