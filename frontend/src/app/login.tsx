import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native'

import { useState } from 'react'
import { router } from 'expo-router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function realizarLogin() {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos')
      return
    }

    try {
      setCarregando(true)

      const resposta = await fetch('https://sistema-de-auth-node-mysql-sj55.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          senha
        })
      })

      const dados = await resposta.json()

      if (!resposta.ok) {
        Alert.alert('Erro', dados.erro || 'Não foi possível realizar o login')
        return
      }

      router.replace({
        pathname: '/home',
        params: {
          id: String(dados.usuario.id),
          nome: dados.usuario.nome,
          email: dados.usuario.email
        }
      })
    } catch (erro) {
      console.log(erro)
      Alert.alert(
        'Erro de conexão',
        'Não foi possível conectar ao servidor'
      )
    } finally {
      setCarregando(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaaaaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={realizarLogin}
        disabled={carregando}
      >
        <Text style={styles.buttonText}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/cadastro')}>
        <Text style={styles.link}>Ainda não tenho uma conta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#242424'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#aca465',
    textAlign: 'center',
    marginBottom: 35
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#aca465',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25
  },
  buttonText: {
    color: '#242424',
    fontSize: 16,
    fontWeight: 'bold'
  },
  link: {
    color: '#aca465',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 25
  },
  backText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15
  }
})