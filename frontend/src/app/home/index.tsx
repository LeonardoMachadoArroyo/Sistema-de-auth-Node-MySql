import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function Home() {
  const { uid, nome } = useLocalSearchParams()

  const [saldo, setSaldo] = useState('')
  const [debito, setDebito] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSalvarMovimentacao() {
    // Se ambos os campos estiverem vazios, não envia
    if (!saldo && !debito) {
      Alert.alert('Atenção', 'Informe pelo menos o valor do saldo ou do débito.')
      return
    }

    try {
      setCarregando(true)

      const resposta = await fetch('http://localhost:3000/gerenciamento/alterarRotatividade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: Number(uid),
          saldo: saldo ? Number(saldo) : 0, // Se vazio, envia 0
          debito: debito ? Number(debito) : 0 // Se vazio, envia 0
        })
      })

      const dados = await resposta.json()

      if (!resposta.ok) {
        Alert.alert('Erro', dados.erro || 'Falha ao registrar movimentação')
        return
      }

      Alert.alert('Sucesso', 'Registrado com sucesso!')
      setSaldo('')
      setDebito('')
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível se conectar ao servidor')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {nome}!</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Adicionar Saldo (Receita):</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          placeholderTextColor="#aaaaaa"
          keyboardType="numeric"
          value={saldo}
          onChangeText={setSaldo}
        />

        <Text style={styles.label}>Adicionar Débito (Despesa):</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          placeholderTextColor="#aaaaaa"
          keyboardType="numeric"
          value={debito}
          onChangeText={setDebito}
        />

        <TouchableOpacity style={styles.button} onPress={handleSalvarMovimentacao} disabled={carregando}>
          <Text style={styles.buttonText}>{carregando ? 'Salvando...' : 'Salvar Registros'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#242424', justifyContent: 'center' },
  title: { fontSize: 24, color: '#aca465', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#333', padding: 20, borderRadius: 10 },
  label: { color: '#fff', fontSize: 16, marginBottom: 8, marginTop: 10 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 16 },
  button: { backgroundColor: '#aca465', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 25 },
  buttonText: { color: '#242424', fontWeight: 'bold', fontSize: 16 }
})