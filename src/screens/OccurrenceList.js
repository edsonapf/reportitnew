import React, {Component} from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native';
import OccurrenceListComponent from '../components/OccurrencesListComponent';

export default class Occ extends Component {
    render(){       
        const occ = this.props.navigation.state.params.occ.map((o, i)=> {
            return (<OccurrenceListComponent
                key={i} 
                lostItem={o.itemsLost}
                street={o.address}
                date={o.date}/>)
        }
        )

        return(
            <ScrollView style={styles.container}>
                {occ ? occ : <Text>Não tem nada</Text>}
            </ScrollView>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7'
        // backgroundColor: 'red'
    }
})