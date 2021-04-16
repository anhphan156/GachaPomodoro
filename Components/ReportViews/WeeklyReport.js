import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTheme } from 'victory-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const { width } = Dimensions.get("window");

const data = [
    [
        { x: 'a', y: 5 },
        { x: 'b', y: 3 },
        { x: 'c', y: 7 },
        { x: 'd', y: 4 },
        { x: 'e', y: 8 },
        { x: 'f', y: 1 },
        { x: 'g', y: 0 },
    ],
    [
        { x: 'a', y: 14 },
        { x: 'b', y: 12 },
        { x: 'c', y: 10 },
        { x: 'd', y: 18 },
        { x: 'e', y: 10 },
        { x: 'f', y: 15 },
        { x: 'g', y: 17 },
    ]
];

const WeeklyReport = props => {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Weekly Report</Text>
            <Text style={styles.textCenter} onPress={() => {setShow(true); setMode('date');}}>
                {date.toDateString()}
            </Text>
            {show && <DateTimePicker 
                testID="dateTimePicker"
                value={date}
                mode={mode}
                onChange={(event, selectedDate) => {
                    setDate(selectedDate || date);
                    setShow(false);
                }}
            />}
            <VictoryChart width={width*0.8} domainPadding={{x: 30, y: 20}} theme={VictoryTheme.material}>
                <VictoryStack 
                    colorScale={['black', 'blue']}
                >
                    {data.map((x, i) => (<VictoryBar data={x} key={i}/>))}
                </VictoryStack>
            </VictoryChart>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        flexDirection: 'column',
        width
    },
    heading: {
        textAlign: 'center',
        fontSize: 40
    },
    textCenter: {
        textAlign: 'center'
    }
});

export default WeeklyReport;