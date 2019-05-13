import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert, 
    StyleSheet,
    Image 
} from 'react-native';
import { instanceJSON as axios }  from '../helpers/request';
import { connect } from 'react-redux';
import { updateUser } from '../actions/users';

class Auth extends Component {
    state = {
        username: '',
        password: ''
    }

    checkUserInput(){
        
        const validations = []

        validations.push(this.state.username && this.state.username.trim())
        validations.push(this.state.password)
    
        const validForm = validations.reduce((all, v) => all && v)

        if (!validForm) {
            Alert.alert('Preencha todos os campos.')
        } else {
            axios.post('/users/login', {
                username: this.state.username,
                password: this.state.password,
            }).then(response => {
                this.props
                .updateUser(response.data.result, {isLogged: true, token: response.data.token})
                this.props.navigation.navigate('Profile');
            })
            .catch(error => {
                console.warn(error);
            });
            
        }
    }

    render() {
        return (
            <View style={styles.principalContainer}>
                <ScrollView 
                    style={styles.subContainer}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}
                >
                    <View style={styles.inputContainer}>
                        <TextInput 
                            placeholder='Nome de usuário'
                            style={styles.input}
                            onChangeText={username => this.setState({ username })}
                        />
                        <TextInput 
                            placeholder='Senha'
                            secureTextEntry={true}
                            style={styles.input}
                            onChangeText={password => this.setState({ password })}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => this.checkUserInput()}
                        activeOpacity={0.8}
                    >
                        <View style={styles.button}>
                            <Text style={styles.text}>Entrar</Text>
                        </View>
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
    },
    subContainer: {
        flex: 1,
    },
    inputContainer: {
        backgroundColor: '#F7F7F7',
        height: 130,
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

const mapStateToProps = function(state) {
    return {
      user: state.users
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);