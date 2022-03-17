import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors, Metrics, Fonts } from '../values';

import { MyButton } from '../components';

// Icon
import { MaterialIcons } from '@expo/vector-icons';

export default (props) => {
  // console.log(props.route.params)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [continente, setContinente] = useState('');

  // Ira fazer a chamada da função somente uma unica vez, na abertura da tela
  useEffect(() => {
    carregarInformacoes();
  });

  async function carregarInformacoes() {
    try {
      const cadastro = await AsyncStorage.getItem(props.route.params.email);

      const usuario = JSON.parse(cadastro);

      setNome(`${usuario.nome} ${usuario.sobrenome}`);
      setEmail(usuario.email);
      setContinente(usuario.continente);
    } catch (err) {
      console.log(err);
    }
  }

  function confirmeExit() {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      {
        text: 'Sim',
        onPress() {
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  return (
    <View style={Estilo.container}>
      <Text style={Estilo.textTitle}>Seja Bem Vindo(a)</Text>

      <View style={Estilo.containerIconText}>
        <MaterialIcons name="perm-identity" size={24} color={Colors.white} />
        <Text style={Estilo.text}>
          {nome}
          Nome Completo
        </Text>
      </View>
      <View style={Estilo.containerIconText}>
        <MaterialIcons name="mail-outline" size={24} color={Colors.white} />
        <Text style={Estilo.text}>{email}</Text>
      </View>
      <View style={Estilo.containerIconText}>
        <MaterialIcons name="language" size={24} color={Colors.white} />
        <Text style={Estilo.text}>
          {continente}
          Continente
        </Text>
      </View>

      <MyButton
        style={Estilo.button}
        title="Site Cel.Lep"
        onPress={() => props.navigation.navigate('WebScreen')}
      />
      <MyButton style={Estilo.button} title="Sair" onPress={confirmeExit} />
    </View>
  );
};

const Estilo = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: Metrics.padding.base,
  },
  textTitle: {
    fontSize: Fonts.title,
    color: Colors.white,
    marginBottom: Metrics.margin.base,
  },
  containerIconText: {
    flexDirection: 'row',
    marginBottom: Metrics.margin.base,
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: Fonts.base,
    marginLeft: Metrics.margin.small,
  },
  button: {
    marginBottom: Metrics.margin.base,
  },
});
