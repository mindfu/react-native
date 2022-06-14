import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import yelp from '../api/yelp'

const ResultsShowScreen = ({ navigation}) => {
  const [result, setResult] =  useState(null)
  const id = navigation.getParam('id')

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`)
    setResult(response.data)
  }

  useEffect(() => {
    getResult(id)
  }, [])

  if (!result){
    return null
  }

  console.log(result)
  return (
    <View>
      <Text style={styles.text}>Photos of {result.name}</Text>
      <FlatList 
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
    marginLeft: 10
  }
})

export default ResultsShowScreen