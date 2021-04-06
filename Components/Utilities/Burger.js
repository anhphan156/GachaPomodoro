import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const Burger = (props) => {
    return (
        <View style={styles.btn}>
            <Button title="burger" onPress={() => props.navigation.openDrawer()} />
        </View>
    );
};

const styles = StyleSheet.create({
    btn: {
        width: 50
    }
});

export default Burger;