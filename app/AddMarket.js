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
// import Toast from "react-native-toast-message"
import Toast, {DURATION} from 'react-native-easy-toast'
// import AsyncStorage from "`@react-native-community/async-storage`"
import * as ImagePicker from "expo-image-picker"

var { width } = Dimensions.get('window');

const AddMarket = ( {props, navigation}) => {

    const [name, setName] = useState();
    const [website, setWebsite] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [weekday_text, setWeekday_text] = useState();
    const [formatted_address, setFormatted_address] = useState();
    const [image, setImage] = useState();
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
        setWeekday_text(""),
        setFormatted_address(""),
        setDescription(""),
        // setItem(""),
        setImage("")
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setImage(result.uri);
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
            image == "" ||
            lat == "" ||
            lng == ""
            ) {
            setError("Please fill in the form correctly");
        }
        const newImageUri = "file:///" + image.split("file:/").join("");

        let backendUrl = Constants.manifest.extra.backendUrl;

        const newMarketObject = {
            name: name,
            lat: lat,
            lng: lng,
            weekday_text: weekday_text,
            formatted_address: formatted_address,
            website: website,
            image: newImageUri
        };

        axios
            .post(`${backendUrl}/markets`, newMarketObject)
            .then((response) => {
                alert("Thanks for your market")
            })
            .catch((error) => {
                alert("Fail")
        })
    }

    return (
        <FormContainer title="Add Market">
            <View>
            {getCurrentLocation()}
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: image}}/>
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Icon style={{ color: "white"}} name="camera" /> 
                </TouchableOpacity>
            </View>
            <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Name</Text>
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
               <Text style={{ fontWeight: "bold"}}>Website</Text>
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
               <Text style={{ fontWeight: "bold"}}>Opening Hours</Text>
               </View>
            <View>
            <Input 
            placeholder="Opening Hours"
            name="weekday_text"
            id="weekday_text"
            value={weekday_text}
            onChangeText={(text) => setWeekday_text(text)}
           />
            </View>
            <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>
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
                <Button title="Add Market"

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
        marginTop: 100,
        marginBottom: 400,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "#e91e63",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    }
})

export default AddMarket;

