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

export default function CreateAccount() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [carregando, setCarregando] = useState(false)

async function criarConta() {
  

  // if (!nome || !email || !senha || !confirmarSenha) {
    

  //   Alert.alert('Atenção', 'Preencha todos os campos')
  //   return
  // }

  // if (senha !== confirmarSenha) {
    

  //   Alert.alert('Atenção', 'As senhas não são iguais')
  //   return
  // }

  // if (senha.length < 6) {

  //   Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres')
  //   return
  // }

  try {
    setCarregando(true)

    const resposta = await fetch('https://sistema-de-auth-node-mysql-sj55.onrender.com/auth/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome,
        email,
        senha
      })
    })

    console.log('Status da resposta:', resposta.status)

    const dados = await resposta.json()

    if (!resposta.ok) {
      Alert.alert(
        'Erro',
        dados.erro || 'Não foi possível criar a conta'
      )
      return
    }

    Alert.alert('Sucesso', 'Conta criada com sucesso!', [
      {
        text: 'Entrar',
        onPress: () => router.replace('/login')
      }
    ])
  } catch (erro) {
    console.log('8. Erro no cadastro:', erro)

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
      <Text style={styles.title}>Criar conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#aaaaaa"
        value={nome}
        onChangeText={setNome}
      />

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

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={criarConta}
        disabled={carregando}
      >
        <Text style={styles.buttonText}>
          {carregando ? 'Criando...' : 'Criar conta'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.link}>Já tenho uma conta</Text>
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
    marginBottom: 30
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