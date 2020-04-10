import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';

import styles from './styles';

import logoImg from '../../assets/logo.png';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function handleDatail(incidents) {
    navigation.navigate('Datail', {incidents});
  }

  async function loadIncidents() {
    const response = await api.get(`incidents?page=${page}`);

    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de: <Text style={styles.headerTextBold}> {total} </Text> casos
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo APAE</Text>
      <Text style={styles.description}>Escolha um caso e salve uma vida</Text>

      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({item: incident}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}> ONG: </Text>
            <Text style={styles.incidentValue}> {incident.name} </Text>

            <Text style={styles.incidentProperty}> CASO </Text>
            <Text style={styles.incidentValue}> {incident.title} </Text>

            <Text style={styles.incidentProperty}> VALOR: </Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.datailsButton}
              onPress={() => handleDatail()}>
              <Text style={styles.datailsButtonText}>Ver mais detalhes</Text>
              <Text style={styles.datailsButtonText}> -> </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Incidents;
