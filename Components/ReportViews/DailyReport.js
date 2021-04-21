import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { VictoryPie, VictoryLabel, VictoryLegend } from 'victory-native';
import Svg from 'react-native-svg';

import { db } from '../../misc/firebase';

const { width } = Dimensions.get("window");

const getTodayData = async () => {
    const querySnapShot = await db.collection('Intervals')    
        .where('date', '==', new Date().toDateString())
        .get();

    return querySnapShot.docs.map(x => x.data());
}

const DailyReport = props => {

    const [todayData, setTodayData] = useState();

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getTodayData().then(x => {

                // Firestore Obj => {"category": "duration"} by reduce => [{"x": "category", "y": "duration"}] by Object entries and map
                setTodayData(Object.entries(x.reduce((acc, x) => {
                    return acc[x.category]?
                        {...acc, [x.category]: acc[x.category] + parseInt(x.duration)} :
                        {...acc, [x.category]: parseInt(x.duration)};
                }, {})).map(x => ({x: `${x[1]} mins ${x[0]}`, y: x[1]})));
            });
        });

        return unsubscribe;
    }, [props.navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Daily Report</Text>
            <Svg viewBox="0 0 400 500">
                <VictoryPie
                    standalone={false}
                    width={400} height={400}
                    data={todayData}
                    innerRadius={68} labelRadius={100} radius={200}
                    style={{ labels: { fontSize: 20, fill: "white" } }}
                />
                <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 20 }}
                    x={200} y={200}
                    text={!todayData || todayData.length === 0? "No Data Today": todayData.reduce((acc,x) => acc + x.y,0) + ' mins'}
                />
            </Svg>
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

export default DailyReport;