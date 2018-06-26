import React, { Component } from 'react';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Divider from '@material-ui/core/Divider';
import { Provider } from 'react-redux';

// import other components to main container
import AppList from './components/AppList';
import AppDetails from './components/AppDetails';
import AppSearch from './components/AppSearch';
import AppRecommendation from './components/AppRecommendation';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <AppSearch />
        <AppRecommendation />
        <Divider />
        <AppList />
      </div>
      </Provider>
    );
  }
}

export default App;
