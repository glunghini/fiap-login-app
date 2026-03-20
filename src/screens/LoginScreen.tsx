import React, { useState } from "react";
import { 
  View, Text, Image, Pressable, TextInput, 
  KeyboardAvoidingView, Platform, ScrollView, Switch, StyleSheet 
} from "react-native";
import ThemeToggle from "../components/ThemeToggle";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [manterLogado, setManterLogado] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState("email"); 
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = {
    background: isDarkMode ? "#000" : "#FFF",
    text: isDarkMode ? "#FFF" : "#000",
    inputBg: isDarkMode ? "#121212" : "#F9F9F9",
    inputBorder: isDarkMode ? "#333" : "#DDD",
    placeholder: "#666",
  };

  const aplicarMascaraTelefone = (valor: string) => {
    const num = valor.replace(/\D/g, "");
    if (num.length <= 11) {
      return num
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
    return valor;
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        
        <View style={styles.header}>
          <Image
            source={require("../../assets/fiap-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemeToggle 
            isDarkMode={isDarkMode} 
            onToggle={() => setIsDarkMode(!isDarkMode)} 
          />
        </View>

        <View style={[styles.tabContainer, { borderBottomColor: isDarkMode ? "#222" : "#EEE" }]}>
          <Pressable 
            onPress={() => setAbaAtiva("email")}
            style={[styles.tab, abaAtiva === 'email' && styles.activeTab]}
          >
            <Text style={[styles.tabText, { color: abaAtiva === 'email' ? theme.text : "#666" }]}>
                E-MAIL
            </Text>
          </Pressable>
          <Pressable 
            onPress={() => setAbaAtiva("celular")}
            style={[styles.tab, abaAtiva === 'celular' && styles.activeTab]}
          >
            <Text style={[styles.tabText, { color: abaAtiva === 'celular' ? theme.text : "#666" }]}>
                CELULAR
            </Text>
          </Pressable>
        </View>

        <View style={styles.form}>
          <Text style={[styles.label, { color: theme.text }]}>
            {abaAtiva === "email" ? "ENDEREÇO DE E-MAIL" : "NÚMERO DE CELULAR"}
          </Text>
          
          <TextInput
            placeholder={abaAtiva === "email" ? "exemplo@fiap.com.br" : "(11) 99999-9999"}
            placeholderTextColor={theme.placeholder}
            style={[styles.input, { borderColor: theme.inputBorder, color: theme.text, backgroundColor: theme.inputBg }]}
            value={abaAtiva === "email" ? email : telefone}
            onChangeText={(txt) => abaAtiva === "email" ? setEmail(txt) : setTelefone(aplicarMascaraTelefone(txt))}
            keyboardType={abaAtiva === "email" ? "email-address" : "phone-pad"}
            maxLength={abaAtiva === "celular" ? 15 : undefined}
          />

          <Text style={[styles.label, { color: theme.text }]}>SENHA</Text>
          <TextInput
            placeholder="Sua senha"
            placeholderTextColor={theme.placeholder}
            secureTextEntry
            style={[styles.input, { borderColor: theme.inputBorder, color: theme.text, backgroundColor: theme.inputBg }]}
            value={senha}
            onChangeText={setSenha}
          />

          <View style={styles.row}>
            <View style={styles.inline}>
              <Switch 
                value={manterLogado} 
                onValueChange={setManterLogado}
                trackColor={{ false: "#767577", true: "#ED1C24" }}
              />
              <Text style={{ color: theme.text, marginLeft: 8 }}>Manter logado</Text>
            </View>
            <Text style={styles.redText}>Esqueceu a senha?</Text>
          </View>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>ENTRAR</Text>
          </Pressable>

          <View style={styles.footer}>
            <Text style={{ color: "#666" }}>Não tem uma conta?</Text>
            <Pressable>
              <Text style={styles.redText}>Criar conta agora</Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 25, 
    paddingTop: 60 
  },
  logo: { width: 100, height: 45 },
  tabContainer: { 
    flexDirection: "row", 
    paddingHorizontal: 25, 
    marginTop: 40, 
    borderBottomWidth: 1 
  },
  tab: { paddingBottom: 15, marginRight: 30 },
  activeTab: { borderBottomWidth: 3, borderBottomColor: "#ED1C24" },
  tabText: { fontWeight: "bold", fontSize: 16, letterSpacing: 0.5 },
  form: { padding: 25, marginTop: 20 },
  label: { fontSize: 12, fontWeight: "bold", marginBottom: 12, letterSpacing: 1 },
  input: { 
    borderWidth: 1.5, 
    borderRadius: 16, 
    padding: 18, 
    marginBottom: 25,
    fontSize: 16
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 40 },
  inline: { flexDirection: "row", alignItems: "center" },
  redText: { color: "#ED1C24", fontWeight: "bold" },
  button: { 
    backgroundColor: "#ED1C24", 
    padding: 20, 
    borderRadius: 20, 
    alignItems: "center",
    shadowColor: "#ED1C24",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  footer: { marginTop: 40, alignItems: "center", gap: 5 }
});