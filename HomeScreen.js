import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Header, AirbnbRating, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      articleDetails: {}
    };
  }

  componentDidMount() {
    this.getArticle();
  }

  timeConvert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return `${hours} hrs ${minutes} mins`;
  }

  getArticle = () => {
    const url = "http://localhost:5000/get-movie";
    axios
      .get(url)
      .then(response => {
        let details = response.data.data;
        details["duration"] = this.timeConvert(details.duration);
        this.setState({ movieDetails: details });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  likedMovie = () => {
    const url = "http://localhost:5000/liked-movie";
    axios
      .post(url)
      .then(response => {
        this.getMovie();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  unlikedMovie = () => {
    const url = "http://localhost:5000/unliked-movie";
    axios
      .post(url)
      .then(response => {
        this.getMovie();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  
   render() {
    const { articleDetails } = this.state;
    if (articleDetails.poster_link) {
      const {
        poster_link,
        title,
        release_date,
        duration,
        overview,
        rating
      } = articleDetails;

        return(
            <View>
                <View>
                   <Header
                   centreComponent={{
                    text:"article recommendion",
                    style:styles.headerTitle
                   }}
                   rightComponent={{icon:"search"}}
                   backgroundColor={"pink"}
                   containerStyle={{flex:1}}
                   />
                </View>
                   
                <View style={styles.subContainer}>
                    <View style={styles.subTopContainer}>
                        
                        <View style={styles.subBottomContainer}>
                        <View style={styles.upperBottomContainer}></View>
                        </View>
                    <TouchableOpacity onPress={this.likedMovie}>
                    <Icon
                      reverse
                      name={"check"}
                      type={"entypo"}
                      size={RFValue(30)}
                      color={"#76ff03"}
                    />
                  </TouchableOpacity>
                   <TouchableOpacity onPress={this.likedMovie}>
                    <Icon
                      reverse
                      name={"check"}
                      type={"entypo"}
                      size={RFValue(30)}
                      color={"#76ff03"}
                    />
                  </TouchableOpacity>
                   
                    </View>

                </View>
            </View>
        )
        }
         return null;
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    headerContainer: {
      flex: 0.1
    },
    headerTitle: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: RFValue(18)
    },
    subContainer: {
      flex: 0.9
    },
    subTopContainer: {
      flex: 0.4,
      justifyContent: "center",
      alignItems: "center"
    },
    posterImage: {
      width: "60%",
      height: "90%",
      resizeMode: "stretch",
      borderRadius: RFValue(30),
      marginHorizontal: RFValue(10)
    },
    subBottomContainer: {
      flex: 0.6
    },
    upperBottomContainer: {
      flex: 0.2,
      alignItems: "center"
    },
    title: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      textAlign: "center"
    },
    subtitle: {
      fontSize: RFValue(14),
      fontWeight: "300"
    },
    middleBottomContainer: {
      flex: 0.35
    },
    overview: {
      fontSize: RFValue(13),
      textAlign: "center",
      fontWeight: "300",
      color: "gray"
    },
    lowerBottomContainer: {
      flex: 0.45
    },
    iconButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    },
    buttonCotainer: {
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      width: RFValue(160),
      height: RFValue(50),
      borderRadius: RFValue(20),
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      marginTop: RFValue(15)
    },
    buttonText: {
      fontSize: RFValue(15),
      fontWeight: "bold"
    }
  });