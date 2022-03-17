import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

import { Colors, Metrics } from '../values'

export default props => {

  const { style, ...rest } = props

  return(
    <TextInput style={ [Estilo.input, style] } 
        { ...rest }
    />
  )
}

const Estilo = StyleSheet.create(
  {
    input: {
      height: 48,
      borderWidth: 1,
      borderRadius: Metrics.radius.base,
      backgroundColor: Colors.white,
      paddingVertical: Metrics.padding.small,
      paddingHorizontal: Metrics.padding.base
    }
  }
)