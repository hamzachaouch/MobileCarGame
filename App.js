import React from 'react';
import {Alert,TouchableOpacity, StyleSheet, ImageBackground,Text, View,Dimensions,Animated,Image } from 'react-native';
import Enemy from './app/components/Enemy'
export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            movePlayerVal : new Animated.Value(90),
            playerSide : 'left',
            score : 0 ,
            color: require('./app/img/ennemy1.png'),
            moveEnemyval: new Animated.Value(0),
            enemyStartposX : 90 ,
            enemySide: 'left',
            enemySpeed : 4200,

            gameOver : false
        }

    }

  componentDidMount= ()=>{
      this.animatedEnemy();
  }
  animatedEnemy= ()=>{
      this.state.moveEnemyval.setValue(-100)
      var windowH = Dimensions.get('window').height

      var r = Math.floor(Math.random()*2)+1
      if(r==2){
        r=90
        this.setState({enemySide: 'left'})
      }else{
        //enemy is on the right
        r= Dimensions.get('window').width - 160
        this.setState({enemySide:'right'})
      }
      this.setState({enemyStartposX : r})
      var refreshIntervalId
      //check collision each 50 ms
      refreshIntervalId= setInterval(()=>{
        //collision
        if (this.state.moveEnemyval._value >  windowH - 280
        && this.state.movePlayerVal._value < windowH - 180
            && this.state.playerSide == this.state.enemySide
        ){
            clearInterval(refreshIntervalId)
            this.state.gameOver=true
            this.gameOver()
          }
      },50)
        //increase enemy speed each 20 sec
      setInterval(()=>{
        this.setState({enemySpeed: this.state.enemySpeed -50 })
      },7000)

      //animate the enemy
      Animated.timing(
        this.state.moveEnemyval ,
          {
             toValue : Dimensions.get('window').height
            ,duration: this.state.enemySpeed
          }
      ).start(event => {
          if(event.finished && this.state.gameOver == false){
          clearInterval(refreshIntervalId)
          this.setState({score: ++this.state.score  })
          this.carColorChange()
          this.animatedEnemy()
            }
      })

    }

    gameOver(){
      Alert.alert("you lose !!")
    }

  //car color variabel
  carColorChange(){
      var color = Math.floor(Math.random()*2)+1
      if(color==2){
        this.state.color= require('./app/img/ennemy1.png')
      }else{
          this.state.color= require('./app/img/ennemy2.png')
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
              {paddingBottom: 20,transform:[
                  {translateX:this.state.movePlayerVal}
                  ]}]} />
          <Enemy
            enemyImg ={this.state.color}
            enemyStartposX={this.state.enemyStartposX}
            moveEnemyval={this.state.moveEnemyval}
          />


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
