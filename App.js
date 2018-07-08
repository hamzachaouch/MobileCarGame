import React from 'react';
import {TouchableOpacity, StyleSheet, ImageBackground,Text, View,Dimensions,Animated,Image } from 'react-native';

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            movePlayerVal : new Animated.Value(90),
            playerSide : 'left',
            score : 0 ,

        }

    }



  render() {

    return (
      <ImageBackground source={require('./app/img/back.png')} style={styles.container}>
          <View style={{flex:1,marginTop:Dimensions.get('window').height-
              (Dimensions.get('window').height-20)}}>
              <View style={styles.points}>
                  <Text style={{fontWeight:'bold',alignContent:'center',color:"#fff"}}>Score: </Text>

                  <Text style={{color:'white',fontSize:30}}>{this.state.score}</Text>
              </View>
          </View>
          <Animated.Image source={require('./app/img/player.png')} style={[styles.player ,
              {transform:[
                  {translateX:this.state.movePlayerVal}
                  ]}]} />

          <View style={styles.controls}>
              <TouchableOpacity onPress={()=> this.movePlayer('left')}>
             <Image  source={require('./app/img/gauche.png')} style={styles.left}/>
              </TouchableOpacity>

                  <View style={{width:30}}/>
          <TouchableOpacity onPress={()=> this.movePlayer('right')}>
              <Image  source={require('./app/img/droite.png') }style={styles.right}/>
          </TouchableOpacity>
          </View>

      </ImageBackground>
    );
  }
  movePlayer(direction){
      // move player right
      if (direction =='right'){
        this.setState({playerSide:'right'})
        Animated.spring(
             this.state.movePlayerVal,
            {
                toValue: Dimensions.get('window').width - 160 ,
                tension : 120,
         }
        ).start()
      }else if (direction=='left'){
          this.setState({playerSide:'left'})
          Animated.spring(
              this.state.movePlayerVal,
              {
                  toValue: 90 ,
                  tension : 120,
              }
          ).start()
      }


      //move player left
  }

}

const styles = StyleSheet.create({
    left :{
      width: 80,
      height: 50,
    },
    right:{
      width: 80,
      height: 50,
    },
    controls:{
      paddingTop:20,
      flexDirection:'row',
      alignItems: 'center',
      alignContent: "center",
      justifyContent:'center'


    },
    player: {
     width: 70,
     height: 100,
     position:'absolute',
     zIndex: 1,
     bottom:50,
     resizeMode:'stretch',

   } ,
   container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position:'relative',
  },
   points:{
    width:160,
    height:80,
    backgroundColor:"transparent",
    flexDirection:'column',
    paddingLeft:5,
   }
});
