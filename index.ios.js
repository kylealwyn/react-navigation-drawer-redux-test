import React from 'react';
import { View, Text, AppRegistry } from 'react-native';
import { DrawerNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import {
  createStore,
  combineReducers,
} from 'redux';

class Screen1 extends React.Component {
  static navigationOptions = {
    drawer: () => ({
      label: 'Screen 1'
    })
  }

  render() {
    return (
      <View>
        <Text>Screen 1</Text>
      </View>
    )
  }
}

class Screen2 extends React.Component {
  static navigationOptions = {
    drawer: () => ({
      label: 'Screen 2'
    })
  }

  render() {
    return (
      <View>
        <Text>Screen 2</Text>
      </View>
    )
  }
}

const AppNavigator = DrawerNavigator({
  Screen1: { screen: Screen1 },
  Screen2: { screen: Screen2 }
});

const store = createStore(
  combineReducers({
    nav: (state, action) => AppNavigator.router.getStateForAction(action, state)
  })
)

const AppWithNavigation = ({ dispatch, navState }) => (
  <AppNavigator
    navigation={
      addNavigationHelpers({
        dispatch,
        state: navState,
      })
    }
  />
);

const ConnectedAppWithNavigation = connect(state => ({ navState: state.nav }))(AppWithNavigation);

const App = () => (
  <Provider store={store}>
    <ConnectedAppWithNavigation />
  </Provider>
);

AppRegistry.registerComponent('rndrawerredux', () => App);
