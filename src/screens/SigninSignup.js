import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet 
} from 'react-native';
import { connect } from 'react-redux';


class SigninSignup extends Component {


    componentWillMount() {
        if (this.props.isLogged) {
            this.props.navigation.navigate('Profile')
        }
    }

    render() {
        return (
            <View style={styles.principalContainer}>
                <Text style={styles.textHeader}>ReportIt</Text>
                <View style={styles.subContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.props.navigation.navigate('Auth')}
                    >
                        <View style={styles.button}>
                            <Text style={styles.text}>Entrar</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#F7F7F7'}}>OU</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.props.navigation.navigate('Signup')}
                    >
                        <View style={styles.button}>
                            <Text style={styles.text}>Cadastrar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    principalContainer: {
        flex: 1,
        backgroundColor: '#008BFF',
        // justifyContent: 'center',
        // alignItems: 'center',  
    },
    subContainer: {
        flex: 1,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#F7F7F7',
        margin: 30,
        fontSize: 18,
        height: 65,
        width: 250,
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
    }
})

const mapStateToProps = function(state) {
    return {
      isLogged: state.isLogged
    }
}

export default connect(mapStateToProps)(SigninSignup);