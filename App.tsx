import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Image } from 'react-native';
import AppHeader from './components/appbar';
import CustomButton from './components/button';
import * as Speech from 'expo-speech';

interface Props {

}

interface State {
  thingToSay: string
}

// let windowSize = useWindowDimensions();

export default class App extends React.Component<Props, State> {

  constructor(props: Props, state: State) {
    super(props, state);

    this.state = {
      thingToSay: ''
    }
  }

  speak = (): any => {


    let thingToSay: string = this.state.thingToSay;

    let format: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~¨]+/;

    if (thingToSay == null || thingToSay.trim().length == 0) {
      alert('Please enter a sentence or a word to be spoken');
      return null;
    } else if (format.test(thingToSay)) {
      alert('Please ensure that you don\'t write any special characters');
      return null;
    }

    let thingToSayWithFormatting = thingToSay.toLowerCase().trim();

    Speech.speak(thingToSayWithFormatting)
  }

  onTextInputTextChanged = (text: string): void => {
    this.setState({
      thingToSay: text
    })
  }

  render() {
    return (
      <View>
        <AppHeader title='Text To Speech'></AppHeader>
        <View style={styles.textToSpeechImageSurrounding}>
          <Image source={{ uri: 'https://miro.medium.com/max/2560/1*LyLWfbHfFUG_OyyGSwK-_w.png' }} style={styles.textToSpeechImage} />
        </View>
        <View style={styles.textInputSurrounding}>
          <TextInput style={styles.textInput} onChangeText={this.onTextInputTextChanged} />
        </View>
        <View>
          <CustomButton width={windowSize.width / 4} onPress={() => this.speak} title='Speak' color='purple' marginTop={30} marginLeft={windowSize.width / 2 - windowSize.width / 8} />
        </View>
      </View>
    );
  }
}

var windowSize: any = Dimensions.get('window');

const styles = StyleSheet.create({
  textInputSurrounding: {
    paddingTop: 20.0,
    paddingLeft: windowSize.width / 2 - (windowSize.width / 4)
  },
  textInput: {
    paddingLeft: 10,
    backgroundColor: "#ededed",
    borderWidth: 4,
    borderColor: 'black',
    width: windowSize.width / 2,
    height: windowSize.height / 12,
    borderRadius: windowSize.height / 12,
    fontSize: 20
  },
  textToSpeechImageSurrounding: {
    paddingTop: 20,
    paddingLeft: windowSize.width / 2 - (windowSize.width / 10)
  },
  textToSpeechImage: {
    width: windowSize.width / 5,
    height: windowSize.width / 5,
  },
});
