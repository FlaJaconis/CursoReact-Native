import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import {Colors, Metrics } from '../values'

import { MyTextInput, MyPasswordInput, MyButton } from '../components'

export default props => {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function fazerLogin(){
    // consistencias
    if( email == '' ){
      alert('Preencha o E-mail')
      return
    } else if( senha == '' ){
      alert('Preencha a senha')
      return
    }

    // validar o e-mail e senha
    try{
      const cadastro = await AsyncStorage.getItem(email.toLowerCase())

      const usuario = JSON.parse(cadastro)

      if( usuario != null){
        if(senha == usuario.senha){
          // Navegar para a tela de perfil
          props.navigation.reset({
            index: 0,
            routes: [ 
              {
                name: 'PerfilScreen',
                params: { email: email }
              } 
            ]
          })
        } else {
          alert('E-mail ou a senha inválidos!')
        }

      } else {
        alert('Usuário não localizado!')
      }

    } catch(err){
      console.log(err)
    }

  }

  return(
    <View style={ Estilo.container }> 

      <View style={ Estilo.containerLogin }> 
      
        <View style={ Estilo.containerLogoCellep}>
          <Image source={ require('../assets/logo_cellep.png') } />
        </View>

        <MyTextInput placeholder='E-mail' 
                     style={ Estilo.formItem }
                     keyboardType="email-address"
                     value={email}
                     onChangeText={ text => setEmail(text) }
        />

        <MyPasswordInput placeholder="Senha"
                         style={ Estilo.formItem }
                         keyboardType="numeric"
                         value={senha}
                         onChangeText={ text => setSenha(text) }
        />

        <MyButton title="Entrar" 
                  style={ Estilo.formItem }
                  onPress={fazerLogin}
        />

        <View style={ Estilo.containerCadastro }> 
          <Text style={ Estilo.cadastroText }> 
            Não tem cadastro?
          </Text>
          <TouchableOpacity
            onPress={ () => props.navigation.navigate('CadastroScreen') }
          > 
            <Text style={ Estilo.cadastroTextTouch }> 
              Clique Aqui
            </Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={ Estilo.containerLogoHack }> 
      
        <Image source={ require('../assets/logo_estacao_hack.png') } 
               style={ Estilo.logoEH }
        />

      </View>
      
    </View>
  )
}

const Estilo = StyleSheet.create(
  {
    container: {
      flexGrow: 1,
      backgroundColor: Colors.background,
      padding: Metrics.padding.base
    },
    containerLogin: {
      flexGrow: 1,
      justifyContent: 'center'
    },
    containerLogoCellep:{
      alignItems: 'center',
      marginBottom: Metrics.margin.base
    },
    formItem: {
      marginBottom: Metrics.margin.base
    },
    containerCadastro: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    cadastroText: {
      color: Colors.white
    },
    cadastroTextTouch: {
      color: Colors.primary,
      fontWeight: 'bold',
      paddingLeft: Metrics.padding.small
    },
    logoEH:{
      width: 100,
      height: 100,
      resizeMode: 'contain'
    },
    containerLogoHack: {
      alignItems: 'flex-end'
    }
  }
)