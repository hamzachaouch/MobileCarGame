import React from 'react';
import {TouchableOpacity, StyleSheet, ImageBackground,Text, View,Dimensions,Animated,Image } from 'react-native';

export default class Enemy extends React.Component {
   render(){
       return(
           <Animated.Image style={
           {
               width: 70,
               height: 100,
               position:'absolute',
               resizeMode:'stretch',
               left: this.props.enemyStartposX,
               transform: [
                   {translateY : this.props.moveEnemyval},

               ]
           }
           } source={this.props.enemyImg}/>

       )
   }


}

const styles = StyleSheet.create({

});
