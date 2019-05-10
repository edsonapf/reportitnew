import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import SearchLocation from '../components/SearchLocation'

export default class Location extends Component {
    
    state = {
        region: null,
        coordinate: null
    }

    async setActualLocation() {
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
            },
            (e) => { console.warn(e)}
        );
    }

    handleSelectedLocation(data, { geometry }) {
        const { location: {lat: latitude, lng: longitude } } = geometry;
        this.setState({
            region: {
                latitude,
                longitude,
                latitudeDelta: 0.0143,
                longitudeDelta: 0.0134
            }
        });
    }

    async componentWillMount() {
        this.setActualLocation()
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map} 
                    region={ this.state.region }
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    loadingEnabled={true}
                    onRegionChangeComplete={(region) => this.setState({region: region})}
                    onPress={(e) => this.setState({coordinate: e.nativeEvent.coordinate})}
                >
                    {this.state.coordinate ? 
                        <Marker 
                            coordinate={this.state.coordinate}
                            title='Teste'
                            description='teste'/> : null}
                </MapView>
                <SearchLocation
                    onLocationSelected={this.handleSelectedLocation.bind(this)}/>
                <View style={styles.containerButtons}>
                    <TouchableOpacity 
                        style={{ flex: 5 }}
                        activeOpacity={0.8}
                        onPress={() => {
                            this.props.navigation.state.params.address(this.state.coordinate)
                            this.props.navigation.goBack()
                        }}>
                        <View style={styles.reportButton}>
                            <Text style={styles.reportText}>Marcar Local</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-end',
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    containerButtons: {
        flexDirection: 'row',
        height: '9%',
        width: '100%',       
    },
    reportButton: {
        backgroundColor: '#008BFF',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reportText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F7F7F7',
    }
});