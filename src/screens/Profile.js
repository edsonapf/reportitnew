import React, { Component } from 'react';
import userPhoto from '../logo/user-vector-white.png'
import { 
    Text, 
    View,
    TouchableOpacity,
    StyleSheet,
    Image 
} from 'react-native';
import { connect } from 'react-redux';
import { updateUser } from '../actions/users';
import { instanceFile as axios }  from '../helpers/request';


class Profile extends Component {

    state = {
        myOcc: null
    }

    logout() {
        this.props.updateUser({}, {isLogged: false, token: ''})
        this.props.navigation.navigate('SigninSignup')
    }

    listMyOccurrences = async () => {
        try{
            const response = await axios.get(`/occurrences/user/${this.props.id}`)
            this.setState({myOcc: response.data.result});
            this.props.navigation.navigate('MyOccorrences', {occ: this.state.myOcc})
        }catch(e) {
            console.warn(e)
        }       
    }

    render() {

        return (
            <View style={styles.principalContainer}>
                
                <View style={styles.userContainer}>
                    <Image
                        style={styles.image}
                        source={userPhoto}
                    />
                    <Text style={styles.textProfile}>Olá, {this.props.name}</Text>
                </View>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={() => this.listMyOccurrences()}
                    >
                        <Text style={styles.textButton}>Minhas Ocorrências</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={() => this.logout()}
                    >
                        <Text style={styles.textButton}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    principalContainer: {
        flex: 1,
        backgroundColor: '#008BFF'
    },
    userContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionsContainer: {
        backgroundColor: '#F7F7F7',
        flex: 2,
    },
    button: {
        borderBottomWidth: 1,
        borderBottomColor: '#D5D5D5',
        height: 60,
        justifyContent: 'center'
    },
    textButton: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textProfile: {
        fontSize: 30,
        color: '#F7F7F7',
        textAlign: 'center',
        marginTop: 20
    },
    image: {
        width: 90,
        height: 90,
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 70
    }
})

const mapStateToProps = function(state) {
    return {
        id: state.users.id,
        name: state.users.name,
        login: state.users.isLogged
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);