import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux'
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers' 
import { AndroidButton } from './UIComponents'


class DeckQuiz extends React.Component {
  static navigationOptions = {
    title: 'Deck Quiz',
  }

  state = {
    deck: {title:"", questions:[{question:"",answer:""}]},
    currentQuestion: 0,
    correctCount: 0,
    view: 'front'
  }

  componentDidMount(){
    const deck = this.props.navigation.getParam("deck", "")
    console.log(deck)
    this.setState({deck:deck})
  }

  answer = (option) =>{
    if(option == 'correct'){
      this.setState({correctCount:this.state.correctCount+1})
    }
    if(this.state.currentQuestion < this.state.deck.questions.length-1)
      this.setState({currentQuestion:this.state.currentQuestion+1})
    else{
      this.setState({view:'result'})
      clearLocalNotification()
      .then(setLocalNotification)
    }
  }

  flipCard = () => {
    if(this.state.view == 'front')
      this.setState({view:'back'})
    if(this.state.view == 'back')
      this.setState({view:'front'})
  }

  restartQuiz = () => {
    this.setState({
      currentQuestion: 0,
      correctCount: 0,
      view: 'front'
    })    
  }

  render(){
    var { deck, currentQuestion, view, correctCount } = this.state
    return (
        <View style={{marginTop:20, alignItems:'center', justifyContent:'center'}}>
          {view !== 'result' && (
            <View>
              <Text style={{fontSize:14}}>Question {currentQuestion+1} of {deck.questions.length}</Text>
            </View>
          )}
          {view == 'front' && (
            <View>
              <Text style={{fontSize:22, margin:10}}>{deck.questions[currentQuestion].question}</Text>
              <AndroidButton
                onPress={this.flipCard}
                title="See Answer"
                />
            </View>
          )}
          {view == 'back' && (
            <View>
              <Text style={{fontSize:22, margin:10}}>{deck.questions[currentQuestion].answer}</Text>
              <AndroidButton
                onPress={this.flipCard}
                title="See Question"
                />
            </View>
          )}
          {view !== 'result' && (
            <View>
              <AndroidButton
                  onPress={()=>this.answer('correct')}
                  title="Correct"
                  />
              <AndroidButton
                  onPress={()=>this.answer('incorrect')}
                  title="Incorrect"
                  />
            </View>
          )}
          {view == 'result' && (
            <View>
              <Text style={{fontSize:14, margin:10}}>Your score: {correctCount} correct answers out of {deck.questions.length} questions</Text>
              <AndroidButton
                onPress={this.restartQuiz}
                title="Restart Quiz"
                />
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
)(DeckQuiz)