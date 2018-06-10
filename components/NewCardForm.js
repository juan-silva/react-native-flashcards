import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { editEntry } from '../actions'
import { AndroidTextInput, AndroidButton } from './UIComponents'

class NewCardForm extends React.Component {
  static navigationOptions = {
    title: 'New Card',
  }

  state = {
    question: "",
    answer: "",
    deck: null
  }

  componentDidMount(){
    const deck = this.props.navigation.getParam("deck", "")
    this.setState({deck:deck})
  }

  handleQuestionChange = (text) => {
    this.setState({question: text})
  }

  handleAnswerChange = (text) => {
    this.setState({answer: text})
  }

  saveCard = () => {
    const card = {question:this.state.question, answer:this.state.answer}
    var deck = this.state.deck
    deck.questions.push(card)
    console.log(deck)
    this.props.dispatch(editEntry({
      [deck.title]: deck
    }))
    submitEntry({entry:deck, key:deck.title})
    this.props.navigation.goBack()
  }

  render(){
    return (
        <View style={{marginTop:20, height:150, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:22}}>New Card</Text>
          
          <AndroidTextInput
            value = {this.state.question}
            onChangeText={this.handleQuestionChange}
            placeholder="Enter question here..."
          />
          <AndroidTextInput
            value = {this.state.answer}
            onChangeText={this.handleAnswerChange}
            placeholder="Enter answer here..."
          />
          <AndroidButton
            onPress={this.saveCard}
            title="Save Card"
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
)(NewCardForm)