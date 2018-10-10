import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
	state = {
		output: "", 
		flag: false
	};

  render() {
	  if(!this.state.flag){
		this.state.flag = true
		this.getLocations()
	  }
    return (
      <View style={styles.container}>
        <Text>UI Traffic!</Text>
		<Text>{this.state.output}</Text>
      </View>

    );
  }
  getLocations = () => {
	  const formData = new FormData();
	  formData.append('user', 'INSERT USER HERE');
	  formData.append('pass', 'INSERT PASSWORD HERE');
	  formData.append('db', 'mydatabase');
	  formData.append('table', 'location');
	  formData.append('action', 'get')

	return fetch('INSERT URL HERE', 
		{
			method: 'POST',
			headers: {
				'Content-Type': 'form-data'
			}, body:formData
		}
	).then( (data) => data.text()).then((data1) => this.setState({output: data1})); 
	
	}  

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
