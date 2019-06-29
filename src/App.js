import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

import { 
  Button,
  
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  FlatList,
  ListView,
  ActivityIndicator,
  BackHandler,
  ScrollView
} from 'react-native';

import { createAppContainer, createBottomTabNavigator, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

const styles = StyleSheet.create({
  container2: {
      flex: 1,
      marginTop: 0,
      justifyContent: 'center',
      //alignItems: 'center',
      //backgroundColor: '#F5FCFF',
    },      
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
      //borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
      borderRadius: 10
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:50
  },
  buttonContainer2: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    marginLeft:'5%',
    width:'90%',
    //borderRadius:50
  },    
  loginButton: {
    backgroundColor: "#5667D6",
  },
  loginText: {
    color: 'white',
  },
  separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#8E8E8E',
  },
  flatview: {
      justifyContent: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 2,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
      flex: 1
  },
    title: {
      fontSize: 18,
      paddingLeft: 20,
      paddingRight: 20,
      flex: 3,
      //flexDirection:'row'
    },
    date: {
      fontSize: 14,
      paddingLeft: 20,
      paddingRight: 20,
      flex: 1,
      //flexDirection:'row'
      //float:'right'
    },

    releaseYear: {
      //color: 'red'
      fontSize: 12,
      paddingLeft: 20,
      paddingRight: 20                
    }

});

class Tasks extends React.Component {

  onPress = (ID) => {
    alert(ID);
    //this.props.navigation.navigate("Details1b", {Text: ContentFull, id: id, is_read: is_read, item: item});
}

loadMoreMessages = () => {
  alert("More")  
  
}


constructor(props){
    super(props);
    this.state ={ isLoading: true }
  }

  componentDidMount(){
    return fetch('http://navispy.com/php/api/get_json_all_tasks.php', {
      method: 'GET',
      headers: {
        //Accept: 'application/json',
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + token
      }
      })
      .then((response) => response.json())
      .then((responseJson) => {

        var tasks = responseJson;

        this.setState({
          isLoading: false,
          dataSource: tasks,
          unreadOnly: false
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }    
render() {
    if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }

  return (
    <View style={styles.container2}>
      
        <FlatList style={{flex:1}}
            data={this.state.dataSource}
            renderItem={({item}) => 
            
            

            <TouchableHighlight onPress={() => this.onPress(item.ID)}>


                <View style={styles.flatview}>


                    <View style={{flex:1, flexDirection:'row'}}>
                      <Text style={{ 
                                    fontSize: 18,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    flex: 3,
                                    fontWeight: "700"}}>

                                    {item.SiteName}
                      </Text>
                      <Text style={styles.date}></Text>
                    </View>
                    <View style={{flex:1, flexDirection:'column'}}>
                      <Text style={styles.releaseYear}>{item.Comment}</Text>  
                    </View>
                  


                </View>


            </TouchableHighlight>
            
            }

            keyExtractor={({ID}, index) => ID.toString()}
        />
        <TouchableHighlight style={[styles.buttonContainer2, styles.loginButton]} onPress={() => this.loadMoreMessages()}>
          <Text style={styles.loginText}>Загрузить еще</Text>
        </TouchableHighlight>


    </View>

    
  );
}  
}



const AppNavigator = createStackNavigator({
  Home: {
    screen: Tasks, //HomeScreen,
    navigationOptions: ({ navigation }) => ({
        header: null,
        title: 'Tasks',
    }),

  }
})


export default createAppContainer(AppNavigator);
