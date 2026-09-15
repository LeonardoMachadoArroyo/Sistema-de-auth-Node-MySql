import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AuthApp</Text>

      <Text style={styles.subtitle}>
        Entre ou crie sua conta para continuar
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push('/cadastro')}
      >
        <Text style={styles.secondaryButtonText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#242424'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#aca465',
    marginBottom: 12
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40
  },
  button: {
    width: '100%',
    backgroundColor: '#aca465',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 14
  },
  secondaryButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#aca465',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#242424',
    fontSize: 16,
    fontWeight: 'bold'
  },
  secondaryButtonText: {
    color: '#aca465',
    fontSize: 16,
    fontWeight: 'bold'
  }
})