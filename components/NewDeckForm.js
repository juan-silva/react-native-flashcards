import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { AndroidButton, AndroidTextInput } from './UIComponents'

class NewDeckForm extends React.Component {
  static navigationOptions = {
    title: 'New Deck',
  }

  state = {
    deckNameInput: ""
  }

  handleTextChange = (text) => {
    this.setState({deckNameInput: text})
  }

  saveDeck = () => {
    console.log("Saving deck");
    const { deckNameInput } = this.state
    
    const key = deckNameInput
    const entry = {title:deckNameInput, questions:[]}
    this.props.dispatch(addEntry({
      [key]: entry
    }))
    submitEntry({entry:entry, key:deckNameInput})
    this.props.navigation.goBack()
    this.props.navigation.navigate('DeckHome', {deck: entry})
  }

  render(){
    return (
        <View style={{height:150, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:22}}>New Deck</Text>
          <AndroidTextInput
            value = {this.state.deckNameInput}
            onChangeText={this.handleTextChange}
            placeholder="Enter deck name here..."
          />
          <AndroidButton
            onPress={this.saveDeck}
            title="Save Deck"
            />
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
)(NewDeckForm)