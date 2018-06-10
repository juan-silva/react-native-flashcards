import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { purple, white, red } from './utils/colors' 
import { Button } from 'react-native'
import DeckList from './components/DeckList'
import NewDeckForm from './components/NewDeckForm'
import DeckHome from './components/DeckHome'
import NewCardForm from './components/NewCardForm'
import DeckQuiz from './components/DeckQuiz'
import './ReactotronConfig'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}



const DeckTabs = createBottomTabNavigator(
  {
    List: {
      screen: DeckList
    },
    Form: {
      screen: NewDeckForm
    }
  }
)

const navOptions  = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: purple,
  }
}

const MainNavigator = createStackNavigator({
  Home: {
    screen: DeckTabs,
    navigationOptions: {
      header: null
    }
  },
  DeckHome: {
    screen: DeckHome,
    navigationOptions: navOptions
  },
  NewCardForm: {
    screen: NewCardForm,
    navigationOptions: navOptions
  },
  DeckQuiz: {
    screen: DeckQuiz,
    navigationOptions: navOptions
  }
})

const store = createStore(
   reducer, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }
  
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator style={{flex: 1}}/>
        </View>
      </Provider>
    );
  }
}


