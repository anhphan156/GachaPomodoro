import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

import Burger from './Utilities/Burger';

const { width } = Dimensions.get("window");

const data = [
  { quarter: 'Mon', earnings: 14 },
  { quarter: 'Tue', earnings: 12 },
  { quarter: 'Wed', earnings: 10 },
  { quarter: 'Thu', earnings: 4 },
  { quarter: 'Fri', earnings: 8 },
  { quarter: 'Sat', earnings: 1 },
  { quarter: 'Sun', earnings: 0 },
];

const Report = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:1}}>
                <Burger navigation={navigation} />
            </View>
            <View style={{flex:7}}>
                <Text>Report</Text>
                <VictoryChart width={width*0.8} theme={VictoryTheme.material}>
                    <VictoryBar data={data} x="quarter" y="earnings" />
                </VictoryChart>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 40,
        flexDirection: 'column',
    },
});

export default Report;