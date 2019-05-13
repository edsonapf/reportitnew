import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default (props) => {
    var { date, street, lostItem} = props;
    date = toDateFormat(date);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{`Item Perdido: ${lostItem}`}</Text>
            <Text style={styles.text}>{`Rua: ${street}`}</Text>
            <Text style={styles.text}>{`Data: ${date}`}</Text>
        </View>
    );
}

const toDateFormat = date => {
    let dateFormat = new Date(date);
    let dateString = dateFormat.getDate() + '/' + (dateFormat.getMonth()+1) +
        '/' + dateFormat.getFullYear() + ' ' + dateFormat.getHours() + ':' +
        dateFormat.getMinutes();
    return dateString;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#D5D5D5'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})