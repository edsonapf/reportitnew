import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default (props) => {
    const { date, street, lostItem} = props

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{`Item Perdido: ${lostItem}`}</Text>
            <Text style={styles.text}>{`Rua: ${street}`}</Text>
            <Text style={styles.text}>{`Data: ${date}`}</Text>
        </View>
    )
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