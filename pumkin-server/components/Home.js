import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, PermissionsAndroid } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import axios from 'axios';
import SmsListener from 'react-native-android-sms-listener'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Home() {

    useEffect(() => {
        listenSMS();
        // axios.get('http://192.168.0.103:3001/api/console');
    }, []);

    const [logList, setLogList] = useState([{id: "1", message: "Server started", state: "1"}]);
    const [timestamps, setTimestamps] = useState([]);

    const listenSMS = () => {
        const temp = SmsListener.addListener((data) => {
            console.log(data);
            if(data.body.split('\n')[0] === 'offlineTransactionSystemByManmohanAndApurva' && timestamps.includes(data.timestamp) === false){
                var curTimestamp = timestamps;
                curTimestamp.push(data.timestamp);
                setTimestamps(curTimestamp);
                
                console.log (data.body);
                addLogList({id: Date.now(), state: '0', message: data.body});

                process(data);
            }
        })
    }

    const addLogList = (data) => {
        // console.log(data);
        setLogList((curLogList) => {
            return [...curLogList, data];
        });
        // console.log(logList);
    }

    const process = async (data) => {
        addLogList({id: Date.now(), state: '1', message: 'Transaction Processing'});

        const body = data.body;
        const originatingAddress = data.originatingAddress;
        
        const sender_mobile_number = originatingAddress.slice(-10);
        const reciever_mobile_number = body.split('\n')[1];
        const amount = parseInt(body.split('\n')[2]);
        const message = body.split('\n')[3];

        // console.log(sender_mobile_number);
        // console.log(reciever_mobile_number);
        // console.log(amount);
        // console.log(message);

        // write own ip address
        await axios.post('http://192.168.0.103:3001/api/addTransaction', {
            sender_mobile_number : sender_mobile_number,
            reciever_mobile_number : reciever_mobile_number,
            amount : amount,
            message : message
        });

        addLogList({id: Date.now(), state: '2', message: 'Transaction Complete'});

        SmsAndroid.autoSend(
            sender_mobile_number,
            `Debited ${amount}. Amount sent to ${reciever_mobile_number}`,
            (fail) => {
              console.log('Failed with this error: ' + fail);
            },
            (success) => {
              console.log('SMS sent successfully');
            },
        );

        addLogList({id: Date.now(), state: '3', message: 'Confirmation sent to sender'});

        SmsAndroid.autoSend(
            reciever_mobile_number,
            `Credited ${amount}. ${message}`,
            (fail) => {
              console.log('Failed with this error: ' + fail);
            },
            (success) => {
              console.log('SMS sent successfully');
            },
        );

        addLogList({id: Date.now(), state: '4', message: 'Confirmation sent to reciever'});

    }

    return (
        <SafeAreaView style = {styles.messageArea}>
            <View style = {styles.header}>
                <Text style={styles.title}>Pumkin Server</Text>
            </View>
            <ScrollView>
                <View>
                    {logList.map((obj) => {
                        console.log(obj.id);
                        console.log(obj.state);
                        console.log(obj.message);
                        console.log("kdjbfksjdbfksf");
                        if(obj.state === '0'){
                            return(
                                <View key = {Date.now()} style = {styles.cardLeft}>
                                    <Text style={styles.message}>Message: {obj.message}</Text>
                                </View>
                            )
                        }
                        if(obj.state !== '0'){
                            return(
                                <View key = {Date.now()} style = {styles.cardRight}>
                                    <Text style={styles.message}>{obj.message}</Text>
                                </View>
                            )
                        }
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    messageArea: {
        paddingBottom: 90,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    title: {
        fontSize: 25,
    },
    cardLeft: {
        backgroundColor: '#b0e0e6',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderRadius: 10,
        width: WIDTH * 0.8,
    },
    cardRight: {
        backgroundColor: '#9ace9a',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 70,
        marginRight: 10,
        padding: 10,
        borderRadius: 10,
        width: WIDTH * 0.8,
    },
    message: {
        color: 'black',
    }
});
