import { FETCH_APP_FEEDS, FETCH_APP_RECOMM_FEEDS, FETCH_APP_SEARCH_RESULT} from "../actions/types"

const initialState = {
  items: [],
  recommend: [],
  item: {},
  isLoading: true,
}

export default function( state = initialState , action ) {
  switch (action.type) {
    case FETCH_APP_FEEDS:
    return {
      ...state,
      items:action.payload,
      isLoading:false,
    }
    break;
    case FETCH_APP_RECOMM_FEEDS:
    return {
      ...state,
      recommend:action.payload,
      isLoading:false,
    }
    break;
    case FETCH_APP_SEARCH_RESULT:
    return {
      ...state,
      item:action.payload,
      isLoading:false,
    }
    break;
      default:
    return state;

  }
}
