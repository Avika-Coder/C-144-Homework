import React, { Component } from "react"; 
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"; 
import { Header, AirbnbRating, Icon } from "react-native-elements"; 
import { RFValue } from "react-native-responsive-fontsize"; 
import axios from "axios";

export default class RecommendedMovieScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            data: []
        }
    }

    timeConvert=(num)=>{
        var hours = Math.floor(num/60)
        var minutes = num%60
        return `${hours}hrs | ${minutes}mins`
    }

    componentDidMount(){
        this.getData();
    }

    getData=()=>{
        const url = "https://996e-49-205-82-135.ngrok.io/recommended-movies";
        axios.get(url).then(async response=>{
            this.setState({
                data: response.data.data
            })
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

    keyExtractor = (item,index) => index.toString();

    renderItems = ({ item, index }) => {
        return (
          <Card
            key={`card-${index}`}
            image={{ uri: item.poster_link }}
            imageProps={{ resizeMode: "cover" }}
            featuredTitle={item.title}
            containerStyle={styles.cardContainer}
            featuredTitleStyle={styles.title}
            featuredSubtitle = {`${
                item.release_data.split("-")[0]
            } | ${this.timeConvert(item.duration)}`}
            featuredSubtitleStyle={styles.subtitle}
          />
        );
      };

    render(){
        const {data} = this.state;

        return(
            <View style={styles.containerStyle}>
                <Flatlist
                data={data}
                renderItem={this.renderItems}
                keyExtractor={this.keyExtractor}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    title: {
      color: "#fff",
      alignSelf: "flex-start",
      paddingLeft: RFValue(15),
      fontSize: RFValue(25),
      marginTop: RFValue(65)
    },
    subtitle: {
      fontWeight: "bold",
      alignSelf: "flex-start",
      paddingLeft: RFValue(15),
      fontSize: RFValue(15)
    },
    cardContainer: {
      flex: 1,
      borderRadius: RFValue(10),
      justifyContent: "center",
      height: RFValue(110),
      marginBottom: RFValue(20)
    }
});

