import React from 'react';
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { StatusBar } from 'expo-status-bar';

const Map = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" translucent backgroundColor="transparent" />
            <MapView 
                provider="google"
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default Map;