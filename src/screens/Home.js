import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Modal,
    CheckBox,
    Picker,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SeachLocation from '../components/SearchLocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import { instanceFile as axios }  from '../helpers/request';
import { connect } from 'react-redux';
import { updateOccurrences } from '../actions/occurrences'


class Home extends Component {

    // constructor() {
    //     super();
    //     this.state.allOccurrences = this.getAllOccurrences();
    // }

    state = {
        allOccurrences: null,
        region: null,
        marker: {},
        modalVisible: false,
        checked: [false, false],
        dateStart: '',
        dateEnd: '',
        typeOccurrence: 'robbery',
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    updateChecked(index) {
        this.setState(state => {
            const checked = state.checked.map((value, i) => {
                if (i === index){
                    return !value
                } else {
                    return value
                }
            })
            return { checked }
        })
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

    getAllOccurrences = async () => {
        // axios.get('/occurrences/')
        // .then(response => {
        //     this.setState({allOccurrences: response.data.result});
        //     this.props.updateOccurrences(response.data.result);
        //     console.warn('foi aqui');
        // })
        // .catch(error => {
        //     console.warn(error.response);
        // });
        try{
            const response = await axios.get('/occurrences/')
            this.setState({allOccurrences: response.data.result});
            // this.props.updateOccurrences(response.data.result);
            // console.log(this.state.allOccurrences)
        }catch(e) {
            console.warn(e)
        }
    }

    waitASecond() {
        setTimeout(() => {
            console.log('Our data is fetched');
          }, 5000)
    }

    getFilteredOccurrences = async () => {
        if(!this.state.checked[0] && !this.state.checked[1]) {
            this.getAllOccurrences();
        } else {
            // axios.get('/occurrences/', {params:{
            //     ...(this.state.checked[0] && {date_start: this.state.dateStart}),
            //     ...(this.state.checked[0] && {date_start: this.state.dateEnd}),
            //     ...(this.state.checked[1] && {type: this.state.typeOccurrence})
            // }})
            // .then(response => {
            //     this.setState({allOccurrences: response.data.result})
            //     this.props.updateOccurrences(response.data.result);
            //     Alert.alert('Filtrou');
            // })
            // .catch(error => {
            //     console.warn(error.response);
            // });
            try {
                const response = await axios.get('/occurrences/', {params:{
                    ...(this.state.checked[0] && {date_start: this.state.dateStart}),
                    ...(this.state.checked[0] && {date_end: this.state.dateEnd}),
                    ...(this.state.checked[1] && {type: this.state.typeOccurrence})
                }})
                this.setState({allOccurrences: response.data.result});
            }catch(e) {
                console.warn(e)
            }
        }
    }

    componentWillMount = async () => {
        // await this.getAllOccurrences();
        this.setActualLocation();          
    }

    componentDidMount = async () => {
        // await this.getAllOccurrences();
        await this.getFilteredOccurrences();
    }


    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map} 
                    region={this.state.region}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    loadingEnabled={true}
                >
                    { this.state.allOccurrences ? this.state.allOccurrences.map((o, i) => {
                        // console.log('aqui', o)
                        return (
                            <Marker
                                key={i} 
                                title={o.itemsLost}
                                description={o.description}
                                coordinate={{latitude: parseFloat(o.location.coordinates[1]), longitude: parseFloat(o.location.coordinates[0]) }}
                            />
                        ) 
                    })
                    : null }

                    {/* {
                        this.state.marker &&
                            <Marker 
                                // title={l.itemsLost}
                                // description={l.description}
                                coordinate={this.state.marker}
                            />
                    }  */}
                    
                
                </MapView>
                <SeachLocation 
                    onLocationSelected={this.handleSelectedLocation.bind(this)}/>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    presentationStyle='overFullScreen'
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible)
                    }}
                >
                    <View style={styles.filterContainer}>
                        <View style={styles.filters}>
                            <View style={styles.checkContainer}>
                                <View style={{flexDirection: 'row'}}>
                                    <CheckBox 
                                        style={{backgroundColor: '#F7F7F7', marginRight: 5}}
                                        value={this.state.checked[0]} 
                                        onValueChange={() => this.updateChecked(0)}/>
                                    <DatePicker 
                                        disabled={!this.state.checked[0]}
                                        date={this.state.dateStart}
                                        style={{width: 140, backgroundColor: '#F7F7F7'}}
                                        mode='datetime'
                                        format='YYYY-MM-DD HH:mm'
                                        showIcon={false}
                                        androidMode='spinner'
                                        onDateChange={(dateStart) => {this.setState({dateStart: dateStart})}}
                                    />
                                    <DatePicker 
                                        disabled={!this.state.checked[0]}
                                        date={this.state.dateEnd}
                                        style={{width: 140, backgroundColor: '#F7F7F7', marginLeft: 20}}
                                        mode='datetime'
                                        format='YYYY-MM-DD HH:mm'
                                        showIcon={false}
                                        androidMode='spinner'
                                        onDateChange={(dateEnd) => {this.setState({dateEnd: dateEnd})}}
                                    />     
                                </View>
                            </View>
                            <View style={styles.checkContainer}>
                                <CheckBox 
                                    style={{backgroundColor: '#F7F7F7', marginRight: 5}}
                                    value={this.state.checked[1]} 
                                    onValueChange={() => this.updateChecked(1)}/>
                                <Picker
                                    enabled={this.state.checked[1]}
                                    selectedValue={this.state.typeOccurrence}
                                    style={styles.picker}
                                    onValueChange={(itemValue, itemPosition) => 
                                        this.setState({typeOccurrence: itemValue})}>
                                    <Picker.Item 
                                        label='Furto' value='robbery'/>
                                    <Picker.Item 
                                        label='Assalto' value='assault'/>
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <TouchableHighlight
                                style={styles.filterButton}
                                onPress={() => {
                                    this.getFilteredOccurrences();
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text 
                                    style={{fontWeight: 'bold'}}
                                >
                                Filtrar
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                </Modal>
                <View style={styles.containerButtons}>
                    <TouchableOpacity 
                        style={{ flex: 1 }}
                        activeOpacity={0.8}
                        onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                        <View style={[styles.otherButton, {marginRight: 5}]}>
                            {/* <Text style={styles.otherText}>Local</Text> */}
                            <Icon name='filter-list' size={30} color='#F7F7F7'/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ flex: 4 }}
                        activeOpacity={0.8}
                        onPress={() => {
                            this.props.navigation.navigate('ReportDetails', {att: this.getFilteredOccurrences.bind(this)})
                        }}>
                        <View style={styles.reportButton}>
                            <Text style={styles.reportText}>Denunciar</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ flex: 1 }}
                        activeOpacity={0.8}
                        onPress={() => this.setActualLocation()}>
                        <View style={[styles.otherButton, {marginLeft: 5}]}>
                            {/* <Text style={styles.otherText}>Local</Text> */}
                            <Icon name='room' size={30} color='#F7F7F7'/>
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
        height: '80%',
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    otherButton: {
        backgroundColor: '#008BFF',
        height: '80%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reportText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#F7F7F7',
    },
    otherText: {
        fontWeight: 'bold',
        color: '#F7F7F7',
    },
    filterContainer: {
        backgroundColor: '#008BFF',
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 150,
        // alignItems: 'flex-end',
    },
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    picker: {
        width: 120, 
        borderWidth: 1, 
        //borderColor: 'red', 
        //backgroundColor: '#F7F7F7'
    },
    filterButton: {
        backgroundColor: '#F7F7F7',
        height: 30,
        width: 60,
        borderRadius: 10,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Dimensions.get('window').width/2.75,
        // marginRight: 200,
    },
    filters: {
        backgroundColor: '#F7F7F7',
        margin: 5,
        borderRadius: 10
    }
});

const mapStateToProps = function(state) {
    return {
      list: state.occurrences.list,
      login: state.users.isLogged
    }
}

const mapDispatchToProps = {
    updateOccurrences
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);