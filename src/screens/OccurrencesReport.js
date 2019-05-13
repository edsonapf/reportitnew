import React, { Component } from 'react';
import { 
    Text, 
    View,
    CheckBox,
    TouchableOpacity,
    Picker,
    TextInput,
    ScrollView,
    Alert,
    StyleSheet
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Geocoder from 'react-native-geocoder';
import { instanceFile as axios }  from '../helpers/request';

export default class OccurencesReport extends Component {
    state = {
        checked: [false, false, false],
        radius: 100,
        dateStart: '',
        dateEnd: '',
        occurrenceLocal: '',
        typeOccurrence: 'robbery',
        position: null,
        allOccurrences: null,
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

    async getLatLng(streetName) {
        Geocoder.geocodeAddress(streetName)
        .then(res => {
            this.setState({ position: res[0].position})
            console.warn(this.state.position)
        })
        .catch(err => console.warn('err'))
    }

    getFilteredOccurrences = async () => {
        if(!this.state.checked[0] && !this.state.checked[1] && !this.state.checked[2]) {
            Alert.alert('Marque um filtro')
        } else {
            try {
                const response = await axios.get('/occurrences/', {params:{
                    ...(this.state.checked[0] && {date_start: this.state.dateStart}),
                    ...(this.state.checked[0] && {date_end: this.state.dateEnd}),
                    ...(this.state.checked[1] && {radius: this.state.radius}),
                    ...(this.state.checked[1] && {long: this.state.position.lng}),
                    ...(this.state.checked[1] && {latt: this.state.position.lat}),
                    ...(this.state.checked[2] && {type: this.state.typeOccurrence})
                }})
                //console.warn(response.data);
                this.setState({allOccurrences: response.data.result});
                this.props.navigation.navigate('OccurrenceList', {occ: this.state.allOccurrences})
            }catch(e) {
                console.warn('teste')
            }
        }
    }

    render() {
        return(
            <View style={styles.principalContainer}>
                <Text style={styles.text}>Filtros</Text>
                <View style={styles.subContainers}>
                    <View style={styles.checkContainer}>
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
                            date={this.state.dateStart}
                            style={{width: 140, backgroundColor: '#F7F7F7', marginLeft: 15}}
                            mode='datetime'
                            format='YYYY-MM-DD HH:mm'
                            showIcon={false}
                            androidMode='spinner'
                            onDateChange={(dateStart) => {this.setState({dateStart: dateStart})}}
                        />
                    </View>
                    {/* <View style={styles.checkContainer}>
                        <CheckBox 
                            style={{backgroundColor: '#F7F7F7', marginRight: 5}}
                            value={this.state.checked[1]} 
                            onValueChange={() => this.updateChecked(1)}/>
                        <DatePicker 
                            disabled={!this.state.checked[1]}
                            date={this.state.time}
                            style={{width: 200, backgroundColor: '#F7F7F7'}}
                            mode='time'
                            format='HH:mm'
                            showIcon={false}
                            androidMode='spinner'
                            onDateChange={(time) => {this.setState({time: time})}}
                        />
                    </View> */}
                    <View style={styles.checkContainer}>
                        <CheckBox 
                            style={{backgroundColor: '#F7F7F7', marginRight: 5}}
                            value={this.state.checked[1]} 
                            onValueChange={() => this.updateChecked(1)}/>
                        <TextInput 
                            style={styles.input}
                            editable={this.state.checked[1]}
                            placeholder='Digite o nome da rua'
                            onChangeText={occurrenceLocal => this.setState({ occurrenceLocal })}
                        />
                        <TouchableOpacity 
                            style={styles.buttonLocation}
                            activeOpacity={0.8}
                            disabled={!this.state.checked[1]}
                            onPress={() => this.getLatLng(this.state.occurrenceLocal)}>
                            <Text style={styles.textButtonSearch}>Procurar local</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.checkContainer}>
                        <CheckBox 
                            style={{backgroundColor: '#F7F7F7', marginRight: 5}}
                            value={this.state.checked[2]} 
                            onValueChange={() => this.updateChecked(2)}/>
                        <Picker
                            enabled={this.state.checked[2]}
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
                <TouchableOpacity 
                    style={styles.buttonFilter}
                    activeOpacity={0.8}
                    onPress={() => this.getFilteredOccurrences()}>
                    <Text style={styles.textButtonFilter}>Filtrar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    principalContainer: {
        flex: 1,
        // backgroundColor: '#B5E2FA',
        backgroundColor: '#008BFF',
        // justifyContent: 'center',
        padding: 5,
    },
    text: {
        fontSize: 30,
        color: '#F7F7F7',
        fontWeight: 'bold',
    },
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    buttonLocation: {
        backgroundColor: '#42A9FF',
        // backgroundColor: '#B5E2FA',
        height: 35,
        width: 110,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D5D5D5',
        marginLeft: 3
    },
    picker: {
        width: 120, 
        borderWidth: 1, 
        //borderColor: 'red', 
        //backgroundColor: '#F7F7F7'
    },
    subContainers: {
        backgroundColor: '#F7F7F7',
        borderRadius: 10
    },
    buttonFilter: {
        backgroundColor: '#F7F7F7',
        height: 40,
        width: 110,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginRight: 150,
        marginLeft: 150
    },
    filterContainer: {
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        marginTop: 5
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#D5D5D5',
        // height: '80%',
        flex: 5,
        fontSize: 18,
    },
    textButtonSearch: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#F7F7F7'
    },
    textButtonFilter: {
        fontSize: 18,
        fontWeight: 'bold',
        // color: '#F7F7F7'
    }
})