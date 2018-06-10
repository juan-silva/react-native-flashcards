import React from 'react';
import { 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { purple, white, gray } from '../utils/colors' 


export function AndroidButton ({ onPress, title }) {

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={onPress}>
        <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  )

}

export function AndroidTextInput ({ onChangeText, placeholder, value }){
  return (
    <TextInput
      style={styles.inputText}
      value = {value}
      onChangeText={onChangeText} 
      placeholder={placeholder}
      />
  )
}

const styles = StyleSheet.create({
  btn:{
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 5,
    marginBottom: 5,
    height: 35,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 200
  },
  btnText:{
    color: white,
    fontSize: 18,
    textAlign: 'center',
  },
  inputText:{
    height: 40, 
    width:250
  }

})