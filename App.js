import React from 'react';
import { StyleSheet, ImageBackground,Text, View,Dimensions,Animated,Image } from 'react-native';

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            movePlayerVal : new Animated.Value(90),
            playerSide : 'left',


        }
        console.log(this.state.movePlayerVal)

    }



  render() {

    return (
      <ImageBackground source={require('./app/img/back.png')} style={styles.container}>

          <Animated.Image source={require('./app/img/player.png')} style={[styles.player ,
              {transform:[
                  {translateX:this.state.movePlayerVal}
                  ]}]} />

          <View style={styles.controls}>
             <Image onPress={()=> this.movePlayer('left')} source={require('./app/img/gauche.png')} style={styles.left}/>
              <View style={{width:30}}/>
             <Image onPress={()=> this.movePlayer('right')} source={require('./app/img/droite.png') }style={styles.right}/>
          </View>

      </ImageBackground>
    );
  }
  movePleyer(direction){
      // move player right
      if (direction =='right'){
        this.setState({playerSide:'right'})
        Animated.spring(
             this.state.movePlayerVal,
            {
                toValue: Dimensions.get('window').width - 140 ,
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
      flexDirection:'row',
      alignItems: 'center',
      alignContent: "center"
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
});
