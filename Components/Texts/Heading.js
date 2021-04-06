import React from 'react';
import { StyleSheet, Text, View } from 'react-native'

const PrimaryHeading = props => {
    return (
        <View>
            <Text style={styles.primaryHeading}>{props.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    primaryHeading: {
        fontSize: 30       
    }
});

export { PrimaryHeading } ;