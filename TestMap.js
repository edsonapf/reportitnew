import React from 'react'
import MapView from 'react-native-maps'
import { View } from 'react-native'

const TestMap = () => (
    <View style={{ flex:1 }}>
        <MapView 
            style={{ flex: 1 }}
            region={{
                latitude: -27.210753,
                longitude: -49.644183,
                latitudeDelta: 0.0143,
                longitudeDelta: 0.0134,
            }}
            showsUserLocation={true}
            loadingEnabled
        />
    </View>
)

export default TestMap