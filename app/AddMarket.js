import React, { useState, useEffect } from "react"
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    Button,
} from "react-native"
import FormContainer from './Form/FormContainer';
import Input from './Form/Input';
import Icon from "react-native-vector-icons/FontAwesome"
import Constants from 'expo-constants';
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';
// import AsyncStorage from "`@react-native-community/async-storage`"
import * as ImagePicker from "expo-image-picker"
import * as Font from 'expo-font';
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

var { width } = Dimensions.get('window');

const AddMarket = ( {props, navigation}) => {

    const [name, setName] = useState();
    const [website, setWebsite] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [opening_hours, setOpening_hours] = useState();
    const [formatted_address, setFormatted_address] = useState();
    const [image1, setImage1] = useState();
    const [description, setDescription] = useState();

    (async () => {
        if (Platform.OS !== "web") {
            const {
                status,
            } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!")
            }
        }
    })();


    setToNull = () => {
        setName(""),
        setWebsite(""),
        setLat(""),
        setLng(""),
        setOpening_hours(""),
        setFormatted_address(""),
        setDescription(""),
        // setItem(""),
        setImage1("")
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [5, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setImage1(result.uri);
        }
    };
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude)
                setLng(position.coords.longitude)
    })};


    function addMarket() {
        if (name == "" ||
            image1 == "" ||
            lat == "" ||
            lng == ""
            ) {
            setError("Please fill in the form correctly");
        }
        const newImageUri = "file:///" + image1.split("file:/").join("");

        let backendUrl = Constants.manifest.extra.backendUrl;

        const newMarketObject = {
            name: name,
            lat: lat,
            lng: lng,
            opening_hours: opening_hours,
            formatted_address: formatted_address,
            website: website,
            image1: newImageUri
        };

        axios
            .post(`${backendUrl}/markets`, newMarketObject)
            .then((response) => {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Thanks for adding a market! 🤙",
                  });
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Please check the details and enter it again",
                  });
                  console.log(error)
        })
    }

    return (
        <FormContainer 
            title="Add Market" 
        >
            <View>
                {getCurrentLocation()}
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: image1}}/>
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Icon style={{ color: "white"}} name="camera" /> 
                </TouchableOpacity>
            </View>
            <View style={styles.label}>
               <Text style={styles.label}>Name</Text>
            </View>
            <View>
            <Input 
                placeholder="Market Name"
                name="name"
                id="name"
                value={name}
                onChangeText={(text) => setName(text)}
           />
            </View>
            <View style={styles.label}>
               <Text style={styles.label}>Website</Text>
           </View>
            <View>
            <Input 
                placeholder="Website URL"
                name="website"
                id="website"
                value={website}
                onChangeText={(text) => setWebsite(text)}
            />
            </View>
            <View style={styles.label}>
               <Text style={styles.label}>Opening Hours</Text>
               </View>
            <View>
            <Input
            placeholder="Opening Hours"
            name="opening_hours"
            id="opening_hours"
            value={opening_hours}
            onChangeText={(text) => setOpening_hours(text)}
           />
            </View>
            <View style={styles.label}>
               <Text style={styles.label}>
                   Address
                </Text>
               </View>
            <View>
            <Input 
                placeholder="Address"
                name="formatted_address"
                id="formatted_address"
                value={formatted_address}
                onChangeText={(text) => setFormatted_address(text)}
           />
            </View>
            <View>
                <Button 
                    title="Add Market"
                    color="#EA6F20"
                    onPress={() => {
                        addMarket(),  
                        setToNull(), 
                        navigation.navigate('Home')
                    }}
                />
            </View>

        </FormContainer>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        marginBottom: 400,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: width - 30,
        height: 180,
        borderStyle: "solid",
        borderWidth: 4,
        borderRadius: 4,
        padding: 0,
        justifyContent: "center",
        borderColor: "#E0E0E0",
        elevation: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "#EA6F20",
        padding: 8,
        borderRadius: 100,
        elevation: 20,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowOffset: {width: 1, height: 1}
    },
    label: {
        fontFamily: 'Helvetica Neue',
        fontWeight: '800',
        fontSize: 16,
        marginTop: 10,
    }
})

export default AddMarket;

