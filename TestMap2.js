import React, { Component } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import MapView from 'react-native-maps';

export default class App extends Component {

  state = {
    region: null,
    coordinate: []
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude, 
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          }
        })
      }, //sucesso
      () => {}, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    )
  }

  render() {
    const { region } = this.state;

    return (     
      <View style={{ flex: 1, padding: 10, justifyContent: 'flex-end' }}>
        <MapView 
          style={styles.map}
          region={ region }
          showsUserLocation={true}
          loadingEnabled={true}
          onRegionChangeComplete={ (region) => { this.setState({region: region}) } }
          onPress={(e) => {
            const coord = [...this.state.coordinate, e.nativeEvent.coordinate]
            console.log(coord)
            this.setState({coordinate: coord});
          }
          }
        >
          {/*this.state.coordinate ? 
            <MapView.Marker 
              coordinate={ this.state.coordinate }
              title='Teste'
              description='Teste'  
            /> : null*/}
            {this.state.coordinate ? this.state.coordinate.map(coord => (
              <MapView.Marker
                coordinate={ coord }
                title='teste'
                description='teste'
              />
            )) : null}
        </MapView>
        <TouchableOpacity>
            <View style={styles.button}>
                <Text>Clica</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    //justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: 'blue',
    padding: 10,
  },
  subContainer: {
    marginTop: 10,
    //backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    //alignItems: 'stretch',
  },
  header: {
    //flex: 1,
    justifyContent: 'center',
    //backgroundColor: 'white',
  },
  headerText: {
    marginTop: 24,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    //borderBottomWidth: 1,
    //borderBottomColor: 'gray',
    borderColor: 'gray',
    height:40,
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    opacity: 0.5
    // position: 'absolute'
    //width: '80%'
  },
  buttonFacebook: {
    backgroundColor: '#4169E1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});