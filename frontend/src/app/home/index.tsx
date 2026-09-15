import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { useLocalSearchParams, router } from 'expo-router'

export default function Home() {
  const { id, nome, email } = useLocalSearchParams<{
    id: string
    nome: string
    email: string
  }>()

  function sair() {
    router.replace('/')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{nome}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>

        <Text style={styles.label}>ID do usuário</Text>
        <Text style={styles.value}>{id}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={sair}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#242424'
  },
  title: {
    color: '#aca465',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25
  },
  label: {
    color: '#777777',
    fontSize: 14,
    marginTop: 10
  },
  value: {
    color: '#242424',
    fontSize: 18,
    marginTop: 4
  },
  button: {
    backgroundColor: '#aca465',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#242424',
    fontSize: 16,
    fontWeight: 'bold'
  }
})