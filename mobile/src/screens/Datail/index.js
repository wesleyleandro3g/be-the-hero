import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import api from '../../services/api';

import styles from './styles';

import logoImg from '../../assets/logo.png';

const Datail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const incidents = route.params.incidents;
  const message = `Olá ${incidents.name}, gostaria de ajudar no caso: '${incidents.title} com o valor de: ${incidents.value}`;

  function handleGoBack() {
    navigation.goBack();
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=5538999891197&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={styles.voltar}> Voltar </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={styles.incidentProperty}> ONG: </Text>
        <Text style={styles.incidentValue}> {incidents.name} </Text>

        <Text style={styles.incidentProperty}> CASO </Text>
        <Text style={styles.incidentValue}> {incidents.description} </Text>

        <Text style={styles.incidentProperty}> VALOR: </Text>
        <Text style={styles.incidentValue}> {incidents.value} </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Datail;
