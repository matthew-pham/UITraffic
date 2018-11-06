import React, { Component } from "react";
import { Constants, Location, Permissions } from "expo";
import { createBottomTabNavigator } from "react-navigation";
import { Platform, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};

export class App extends Component {
  state = {
    output: "",
    flag: false,
    markers: [],
    globalLongitude: "",
    globalLatitude: "",
    testLon: "",
    testLat: ""
  };

  render() {
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.139238380834923,
          longitude: 80.25188422300266,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    );
  }
}

_getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    this.setState({
      errorMessage: "Permission to access location was denied"
    });
  }
  let location = await Location.getCurrentPositionAsync({});
  this.setState({ location });
  return await Location.getCurrentPositionAsync({});
};

/*
	Gets data from database
  */
getLocations = () => {
  formData = new FormData();
  formData.append("user", "insert user");
  formData.append("pass", "insert pass");
  formData.append("db", "mydatabase");
  formData.append("table", "location");
  formData.append("action", "get");

  return fetch("insert url", {
    method: "POST",
    headers: { "Content-Type": "form-data" },
    body: formData
  })
    .then(data => data.text())
    .then(data1 => this.setState({ output: data1 }));
};

/*
		Inserts location into database
	*/

insertLocations = () => {
  formData = new FormData();
  formData.append("user", "INSERT USER HERE");
  formData.append("pass", "INSERT PASSWORD HERE");
  formData.append("db", "mydatabase");
  formData.append("table", "location");
  formData.append("action", "put");
  formData.append(
    "data",
    '{"longitude": ' +
      this.state.testLon +
      ',"latitude": ' +
      this.state.testLat +
      "}"
  );

  return fetch("INSERT URL HERE", {
    method: "POST",
    headers: { "Content-Type": "form-data" },
    body: formData
  })
    .then(data => data.text())
    .then(data1 => this.setState({ output: data1 }));
};

handleLocation = () => {
  //var aggregatedLocations;
  this._getLocationAsync();

  if (this.state.errorMessage) {
    //Permissions error
  } else if (this.state.location) {
    this.state.globalLongitude =
      "Longitude: " + JSON.stringify(this.state.location.coords.longitude);
    this.state.globalLatitude =
      "Latitude: " + JSON.stringify(this.state.location.coords.latitude);
    this.state.testLon = JSON.stringify(this.state.location.coords.longitude);
    this.state.testLat = JSON.stringify(this.state.location.coords.latitude);
    console.log(this.insertLocations());
    //aggregatedLocations = getLocations();
  }
  setTimeout(this.handleLocation, 5000);
};

/*
		Settings screen
	*/
export class Settings extends Component {
  render() {
    if (!this.state.flag) {
      this.state.flag = true;
      //this.handleLocation();
    }
    return (
      <View style={styles.container}>
        <Text>UI Traffic!</Text>
        <Text>{this.state.globalLongitude}</Text>
        <Text>{this.state.globalLatitude}</Text>
      </View>
    );
  }
}

export default createBottomTabNavigator({
  Home: Home,
  Settings: Settings
});

styles = StyleSheet.create({
  map: {
    height: 100,
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
