import React from 'react';
import {View, Image, ScrollView, Dimensions} from 'react-native';


const {width} = Dimensions.get("window")
const height = width * 0.6;


export default class Banner extends React.Component {
    constructor (props) {
        super(props)
        
    }
    state = {
        images: [],
    };

    imageCheck(){
        if (this.props.item.image3) {
                this.state.images = [this.props.item.image1, this.props.item.image2, this.props.item.image3]
            } else if (this.props.item.image2) {
                this.state.images = [this.props.item.image1, this.props.item.image2]
            } else {
                this.state.images = [this.props.item.image1]
            }
    }
    render(){
    this.imageCheck()
        return (
        <View stlye={{marginTop: 50, width, height}}>
            <ScrollView 
            pagingEnabled 
            horizontal 
            showsVerticalScrollIndicator={false}
            style={{width, height}}>
            {
            this.state.images.map((image, index) => (
            <Image
            key={index}
            source={{uri: image}}
            style={{width, height, resizeMode: 'cover'}}/>
            ))}
            </ScrollView>
        </View>
        )}
}
