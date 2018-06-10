import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { fetchDecks } from '../utils/api'
import Reactotron from 'reactotron-react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString } from '../utils/helpers'
import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from '../utils/api'


const deckList = {
  one:{title:"One Deck", questions:[
    {question:"q1", answer:"a1"},
    {question:"q2", answer:"a2"},
    {question:"q3", answer:"a3"}
  ]},
  two:{title:"Two Deck", questions:[1,2]},
  three:{title:"Three Deck", questions:[1]},
}

class DeckList extends React.Component {

  state = {
    decks: null
  }

  static navigationOptions = {
    title: 'Decks',
  }

  componentDidMount = () => {
     const { dispatch } = this.props 
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((entries)=>{
      Reactotron.log({msg:"Loaded entries","data":entries})
      dispatch(receiveEntries(JSON.parse(entries)))
    }).catch(function(error) {
      console.log('Error Retrieving Entries?: ' + error.message);
    })
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE"
        }}
      />
    );
  }

  renderItem = ({item}) => {
    const { navigate } = this.props.navigation;
    return (
            <View>
              <TouchableOpacity style={{height:80, alignItems:'center', justifyContent:'center'}}
                  onPress={()=>navigate('DeckHome', {deck: item})}
              >
                <Text style={{fontSize:22}}>{item.title}</Text>
                <Text style={{fontSize:12}}># Cards: {item.questions.length}</Text>
              </TouchableOpacity>
            </View>
          ) 
  }

  render(){
    Reactotron.log("Loaded Data:")
    //const { decks } =  this.state;
    const { entries } = this.props
    Reactotron.log({msg:"Loaded SATE",data:entries})
    return (
      <View>
        <FlatList
          data = {Object.values(entries)}
          renderItem = {this.renderItem}
          keyExtractor = {(item, index) => 'key-'+index}
          ItemSeparatorComponent={this.renderSeparator}
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
)(DeckList)