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
import { Item, Picker } from "native-base"
import FormContainer from './Form/FormContainer';
import Input from './Form/Input';
import Icon from "react-native-vector-icons/FontAwesome"
import Constants from 'expo-constants';
import axios from "axios";
import Toast from "react-native-toast-message";
// import Toast from "react-native-toast-message"
// import AsyncStorage from "`@react-native-community/async-storage`"
// import axios from "axios"
// import * as ImagePicker from "expo-image-picker"
// import mime from "mime";

var { width } = Dimensions.get('window');

const AddMarket = (props) => {

    const [pickerValue, setPickerValue] = useState();
    const [name, setName] = useState();
    const [website, setWebsite] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [weekday_text, setWeekday_text] = useState();
    const [formatted_address, setFormatted_address] = useState();
    const [image, setImage] = useState();
    const [description, setDescription] = useState();
    const [item, setItem] = useState(null);
    //Categories to be added for search

    const addMarket = () => {
        if (
            name == "" ||
            // image == "" ||
            lat == "" ||
            lng == ""
        ) {
            setError("Please fill in the form correctly")
        }

        let formData = new FormData();

        // const newImageUri = "file:///" + image.split("file:/").join("");

        // formData.append("image", {
        //     uri: newImageUri,
        //     type: mime.getType(newImageUri),
        //     name: newImageUri.split("/").pop()
        // });
        formData.append("name", name);
        formData.append("website", website);
        formData.append("lat", lat);
        formData.append("lng", lng);
        // formData.append("description", description);
        formData.append("weekday_text", weekday_text);
        formData.append("formatted_address", formatted_address);

        // const config = {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         Authorization: `Bearer ${token}`
        //     }
        // }

        let backendUrl = Constants.manifest.extra.backendUrl

        axios
        .post(`${backendUrl}/markets`, formData)
        .then((res) => {
            console.log("Success")
            console.log(res.data)
        })
        .catch((error) => {
            console.log("Fail")
            console.log(res.data)

        })
    }

    return (
        <FormContainer title="Add Market">
            <View>
                <TouchableOpacity>
                    <Text>Hello Scrummy!</Text>
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
               <Text style={{ fontWeight: "bold"}}>Lat</Text>
           </View>
            <View>
            <Input 
            placeholder="Latitude"
            name="lat"
            id="lat"
            value={lat}
            onChangeText={(text) => setLat(text)}
            keyboardType="numeric"
           />
            </View>
            <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Long</Text>
               </View>
            <View>
            <Input 
            placeholder="Longitude"
            name="lng"
            id="lng"
            value={lng}
            onChangeText={(text) => setLng(text)}
            keyboardType="numeric"
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
               <Text style={{ fontWeight: "bold"}}>Address</Text>
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
                onPress={() => addMarket()}  
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
    }
})

export default AddMarket;



// Name 
// Location
// Image

// optional extras
// description
// opening hours
// address
// website

// Database connection
// Getting location from map marker

// POST request 

// Text input Fields 


// ToDo 
// - Create add page
// - POST request 
// - What happens once you have pressed add 

// Extra
// - Add verified to database 
// - Change pin colours
