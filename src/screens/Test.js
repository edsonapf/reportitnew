import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableHighlight,
    Modal,
    Alert, 
    TouchableOpacity,
    TextInput,
    CheckBox,
    Platform, 
    StyleSheet 
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default class Test extends Component {
    state = {
        modalVisible: false,
      };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={styles.principalContainer}>
                <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                presentationStyle='overFullScreen'
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    this.setModalVisible(!this.state.modalVisible)
                }}>
                <View style={{marginTop: 100, marginLeft: 30, marginRight: 30, backgroundColor: 'red'}}>
                    <View>
                    <Text>Hello World!</Text>

                    <TouchableHighlight
                        onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Text>Hide Modal</Text>
                    </TouchableHighlight>
                    </View>
                </View>
                </Modal>

                <TouchableHighlight
                onPress={() => {
                    this.setModalVisible(true);
                }}>
                <Text>Show Modal</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    principalContainer: {
        flex: 1,
        // backgroundColor: '#008BFF',
    },
    subContainer: {
        flex: 1,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        backgroundColor: '#F7F7F7',
        height: 300,
        width: 330,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 15,
    },
    button: {
        backgroundColor: '#F7F7F7',
        margin: 30,
        fontSize: 18,
        height: 55,
        width: 200,
        borderRadius: 10,
        justifyContent: 'center',
    },
    textHeader: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#F7F7F7',
        textAlign: 'center'
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#D5D5D5',
        fontSize: 16,
    }
})