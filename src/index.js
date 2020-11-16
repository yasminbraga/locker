import React, {useState} from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import * as LocalAuthentication from 'expo-local-authentication'

const data = [
  {name: 'Google', password: '123456'},
  {name: 'Linkedin', password: '123456'},
  {name: 'Instagram', password: '123456'},
  {name: 'Github', password: '123456'},
  {name: 'Facebook', password: '123456'},

]


export default function Locker() {

  const [selected, setSelected] = useState(null)
  const [hasAccess, setHasAccess] = useState(false)

  const select = (index) => {
    if(selected === index) {
      setSelected(null) 
    } else {
      setHasAccess(false)
      authenticate()
      setSelected(index)
    }
  }

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync()

    if (result.success) setHasAccess(true)
  }

  const renderItem = ({item, index}) => (
    <TouchableOpacity 
      activeOpacity={0.6} 
      onPress={() => select(index)} 
      style={styles.item}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <MaterialCommunityIcons name={selected === index && hasAccess ? "lock-open-variant-outline" : "lock-outline"} color="#676767" size={32}/>
      </View>

      {selected === index && hasAccess && (
        <View style={styles.itemPassword}>
          <Text style={styles.itemPasswordText}>{item.password}</Text>
        </View>

        )
      }


    </TouchableOpacity>
  )


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="fingerprint" size={50} color="#676767"/>
        <Text style={styles.title}>Locker</Text>
      </View>

      <FlatList 
        data={data}
        renderItem={renderItem}  
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 26,
  },
  header: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 52,
  }, 
  title: {
    fontSize: 30,
    color: "#676767",
    fontWeight: "bold",
  },
  item: {
    width: "100%",
    backgroundColor: "#202020",
    width: "100%",
    paddingVertical: 28,
    paddingHorizontal: 24,
    marginBottom: 16,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#676767"
  },
  itemPassword: {
    padding: 24,
  },
  itemPasswordText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#676767",
    fontFamily: "monospace",
    textAlign: "center",
  }
})