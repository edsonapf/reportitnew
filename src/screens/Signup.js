import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    TextInput,
    ScrollView, 
    StyleSheet,
    Alert,
    Image,
} from 'react-native';
import { instanceFile as axios }  from '../helpers/request';
import { TextInputMask } from 'react-native-masked-text'

export default class Auth extends Component {
    state = {
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        cpf: '',
        photo: null,
    }

    async checkUserInput(){
        
        const validations = []

        validations.push(this.state.name && this.state.name.trim())
        validations.push(this.state.username && this.state.username.trim())
        validations.push(this.state.password && this.state.password.length >= 6)
        validations.push(this.state.confirmPassword)
        validations.push(this.state.cpf && this.state.cpf.length === 14)
     

        const validForm = validations.reduce((all, v) => all && v)

        if (!validForm) {
            Alert.alert('Preencha todos os campos.')
        } else if (this.state.password !== this.state.confirmPassword) {
            Alert.alert('As senhas não conferem. Verifique e preencha novamente!');
        } else {
            // try {
                // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
                axios.post('/users/register', {
                    name: this.state.name,
                    password: this.state.password,
                    username: this.state.username,
                    dateBirth: '2000-02-02 02:02',
                    registrationNumber: this.state.cpf
                }).then(response => {
                    Alert.alert('Cadastrado com sucesso')
                    this.props.navigation.goBack()
                })
                .catch(error => {
                    console.warn(error.response)
                });
            // } catch(e) {
            //     console.warn(e)
            // }
            
        }
    }

    render() {
        return (
            <View style={styles.principalContainer}>
                <View style={styles.image}>
                    <Image
                        source={require('../logo/logo1.png')}
                    />
                </View>
                <ScrollView 
                    style={styles.subContainer}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}
                >
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Nome'
                            onChangeText={name => this.setState({ name })}
                            style={styles.input}
                        />
                        <TextInput 
                            placeholder='Nome de usuário'
                            onChangeText={username => this.setState({ username })}
                            style={styles.input}
                        />
                        <TextInput 
                            placeholder='Senha'
                            onChangeText={password => this.setState({ password })}
                            secureTextEntry={true}
                            style={styles.input}
                        />
                        <TextInput 
                            placeholder='Confirmar senha'
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            secureTextEntry={true}
                            style={styles.input}
                        />
                        <TextInputMask
                            keyboardType="numeric"
                            placeholder='CPF (Apenas números)'
                            type={'cpf'}
                            onChangeText={cpf => this.setState({ cpf })}
                            style={styles.input}
                        />
                        {/* <TextInput 
                            placeholder='Selecionar a foto'
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            secureTextEntry={true}
                            style={styles.input}
                        /> */}
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={() => this.checkUserInput()}
                    >
                        <Text style={styles.text}>Cadastrar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    principalContainer: {
        flex: 1,
        backgroundColor: '#008BFF',
        // backgroundColor: '#B5E2FA'
    },
    subContainer: {
        flex: 1,
        // backgroundColor: 'red',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    inputContainer: {
        backgroundColor: '#F7F7F7',
        height: 320,
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
    }, image:{
        alignItems: 'center',
        justifyContent: 'center'
    }
})