import React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import DeckQuiz from './DeckQuiz'
import { purple, white, red } from '../utils/colors' 
import { AndroidButton } from './UIComponents'

class DeckHome extends React.Component {
  static navigationOptions = {
    title: 'Deck Details',
  }

  render(){
    const { navigate } = this.props.navigation
    const { entries } = this.props
    const deck = this.props.navigation.getParam("deck", "")
    console.log(deck)
    return(
        <View style={{height:150, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:22}}>{deck.title}</Text>
          <Text style={{fontSize:12}}># Cards: {deck.questions.length}</Text>
          <AndroidButton
            onPress={()=>navigate('NewCardForm', {deck: deck})}
            title="Add New Card" />
          {deck.questions.length > 0 && (
            <View>
              <AndroidButton
                onPress={()=>navigate('DeckQuiz', {deck: deck})}
                title="Start Quiz" />
            </View>
          )}          
        </View>
      )
  }
}



function mapStateToProps (entries) {
  return {
    entries
  }
}

export default connect(
  mapStateToProps,
)(DeckHome)