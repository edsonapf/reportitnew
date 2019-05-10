import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Picker, 
    StyleSheet, 
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert 
} from 'react-native';
import DetailsInput from '../components/DetailsInput';
import DatePicker from 'react-native-datepicker';
import Geocoder from 'react-native-geocoder';
import { instanceFile as axios }  from '../helpers/request';

export default class ReportDetails extends Component {
    state = {
        item: '',
        description: '',
        typeOccurrence: 'robbery',
        date: '',
        addressName: '',
        coord: null,

    }

    async getAddress({latitude: lat, longitude: lng}) {
        Geocoder.geocodePosition({lat, lng}).
        then(res => {
            this.setState({ addressName: res[0].streetName, coord: res[0].position })
        })
        .catch(err => console.warn(err))
    }

    checkUserInput(){
        // console.warn(this.state.coord)
        const validations = []

        validations.push(this.state.item && this.state.item.trim())
        validations.push(this.state.description && this.state.description.trim())
        validations.push(this.state.addressName)
        validations.push(this.state.coord)

        const validForm = validations.reduce((all, v) => all && v)

        if(!validForm){
            Alert.alert('Preencha todos os campos.')
        } else {

            console.warn({id: '5cd4ff495ca08916706bd5be',
            description: this.state.description,
            date: '2020-05-09 21:04',
            type: this.state.typeOccurrence,
            location: `{"lat": ${this.state.coord.lat}, "lng": ${this.state.coord.lng}}`,
            address: this.state.addressName,
            itemsLost: this.state.item,})

            axios.post('/occurrences/create', {
                id: '5cd561bb86c34a2f586d38d5',
                description: this.state.description,
                date: '2020-05-09 21:04',
                type: this.state.typeOccurrence,
                location: `{"lng": ${this.state.coord.lng}, "lat": ${this.state.coord.lat}}`,
                address: this.state.addressName,
                itemsLost: this.state.item,
            }).then(response => {
                Alert.alert('Ocorrencia cadastrada')
                this.props.navigation.state.params.att()
                this.props.navigation.goBack()
            })
            .catch(error => {
                console.warn(error.response)
            });
        }

    }

    render() {
        return (
            <ScrollView 
                style={styles.container}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                >
                <View style={styles.subContainer}>
                    <DetailsInput 
                        label='Item Perdido'
                        example='Celular J7'
                        onChangeText={item => this.setState({ item })}/>
                    <DetailsInput 
                        label='Descrição'
                        example='Dois homens armados'
                        onChangeText={description => this.setState({ description })}
                    />
                    <View style={styles.pickerContainer}>
                        <Text style={styles.text}>Tipo</Text>
                        <Picker
                            selectedValue={this.state.typeOccurrence}
                            style={{width: 120}}
                            onValueChange={(itemValue, itemPosition) => 
                                this.setState({typeOccurrence: itemValue})}>
                            <Picker.Item 
                                label='Furto' value='robbery'/>
                            <Picker.Item 
                                label='Assalto' value='assault'/>
                        </Picker>
                    </View>
                    <Text style={styles.text}>Informações sobre o Local:</Text>
                    <View>
                        <Text style={styles.text}>Data e Horário</Text>
                        <DatePicker 
                            date={this.state.date}
                            style={{width: 200, backgroundColor: '#F7F7F7'}}
                            mode='datetime'
                            format='YYYY-MM-DD HH:mm'
                            showIcon={false}
                            androidMode='spinner'
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.text}>Local</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput
                                placeholder='Rua São João' 
                                editable={false}
                                value={this.state.addressName}
                                style={styles.notEditableInput}/>
                            <TouchableOpacity 
                                style={{flex: 1, marginLeft: 5}}
                                activeOpacity={0.8}
                                onPress={() => {
                                    this.props.navigation
                                    .navigate('Location', {address: this.getAddress.bind(this)})
                                }}>
                                <View style={styles.buttonLocation}>
                                    <Text 
                                        style={[styles.text, {color: '#F7F7F7'}]}
                                    >Lugar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => this.checkUserInput()} 
                    style={styles.reportButton}
                    activeOpacity={0.8}>
                    <Text style={styles.text}>Cadastrar Ocorrência</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#008BFF'    
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonLocation: {
        backgroundColor: '#42A9FF',
        height: '78%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notEditableInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#D5D5D5',
        height: '80%',
        flex: 5,
        fontSize: 18,
    },
    subContainer: {
        backgroundColor: '#F7F7F7',
        padding: 5,
        borderRadius: 10,
    },
    reportButton: {
        backgroundColor: '#F7F7F7',
        height: 50,
        width: 200,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginRight: 100,
        marginLeft: 100
    }
});