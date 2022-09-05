import React, { Component, useEffect, useState } from 'react';
import { traerPlatos } from '../axios/axiosClient';
import { StyleSheet, Text, Image , View, TextInput, FlatList, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useContextState, ActionTypes, contextState} from '../contextState'
import { Button } from 'react-native-web';



const Home =({navigation})=>{
  const [buscador,setBuscador]=useState("");
  const [precioPromedio,setPrecioPromedio]=useState("");
  const [healthScore,setHealthScore]=useState("");
  const [platos,setPlatos]=useState([]);
  const {contextState,setContextState}=useContextState();
  console.log(contextState.menu.platos)
  const renderItem = ({ item }) => {
    return <TouchableOpacity style={styles.item} onPress={() => {
      console.log(item.id)
      navigation.navigate('Info',{id:item.id})}
      }>
      <Text style={styles.title}>{item.title}</Text>
      <Image 
    
      style={styles.tinyLogo}
      source={{
          uri: item.image.toString(),
        }} >
        </Image>
 
    </TouchableOpacity>
   
  };
  const renderItem2 = ({ item }) => {
    return <TouchableOpacity style={styles.item} onPress={() => {
      console.log(item.title)
      navigation.navigate('Info',{id:item.id})}
      }>
      <Text style={styles.title}>{item.title}</Text>
      <Image 
    
      style={styles.tinyLogo}
      source={{
          uri: item?.image?.toString(),
        }} >
        </Image>
        <Button onPress={() => navigation.navigate('Info',{id:item?.id})} title="info"></Button>
        
    </TouchableOpacity>


   
  };

  useEffect (async () => {

      console.log(contextState.token)
      if(contextState.token!=''){
        console.log("Ingreso correctamente")
      }
      else{
        console.log("Mal ingresados los datos")
        navigation.navigate('Form')
      }
      let precioPromedio2=0;
      let healthScore2=0;
      for(let z=0;z<contextState.menu.platos.length;z++){
        precioPromedio2=precioPromedio2+contextState.menu.platos[z].pricePerServing;
        healthScore2=healthScore2+contextState.menu.platos[z].healthScore;
      
      }
      setHealthScore(healthScore2/contextState.menu.platos.length);
      setPrecioPromedio(precioPromedio2);
      
},[]);


  const onChange = async (letras) => {
    if (letras.length > 2) {  
    const data = await traerPlatos(letras); 
    setPlatos(data);
    console.log(platos)
  }
    
}

  return (
    
    <View style={styles.container2}> 

    <Text>Precio acumulativo de todos los platos: {isNaN(precioPromedio)?0:precioPromedio}</Text>
    <Text>Health score promedio: {isNaN(healthScore)?0:healthScore}</Text>

      <SafeAreaView >
      <FlatList
        data={contextState.menu.platos}
        renderItem={renderItem2}
        keyExtractor={(data) => data.title}
      />
 
    </SafeAreaView>
      <Text>Ingrese plato:</Text>
      <TextInput style={styles.buscador} placeholder="Buscar"
      onChangeText={onChange}
      />
  
      
       <SafeAreaView style={styles.container}>
        <FlatList 
          data={platos}
          keyExtractor={(data) => data.title}
          renderItem={renderItem}
        />
        
        </SafeAreaView>

           
    </View>  
  ); 
}
const styles = StyleSheet.create({

  tinyLogo: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  container2: {
 
  },
  item: {

    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
  image: {
    width: 70,
    height:70,
  },
  buscador: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Home
