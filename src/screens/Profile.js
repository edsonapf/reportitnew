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
import { updateUser } from '../actions/users'


class Profile extends Component {

    logout() {
        this.props.updateUser({}, {isLogged: false, token: ''})
        console.warn(this.props.isLogged)
    }

    render() {
        return (
            <View style={styles.principalContainer}>
                
                <View style={styles.userContainer}>
                    <Image
                        style={styles.image}
                        // source={{uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png'}}
                        source={userPhoto}
                    />
                    <Text style={styles.textProfile}>Olá, João</Text>
                </View>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        activeOpacity={0.8}
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
      isLogged: state.isLogged
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);