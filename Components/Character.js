import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';

import Burger from './Utilities/Burger';

const Character = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:1}}>
                <Burger navigation={navigation} />
            </View>
            <View style={{flex:5}}>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 40,
        flexDirection: 'column',
    },
});

export default Character;