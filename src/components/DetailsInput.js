import React from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet 
} from 'react-native';

export default (props) => {
    const { label, example } = props;
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <TextInput 
                placeholder={`Ex.: ${example}`}
                {...props} 
                style={styles.input}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#D5D5D5',
        fontSize: 18,
        height: '60%'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});