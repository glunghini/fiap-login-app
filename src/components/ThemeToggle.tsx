import React from "react";
import { View, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  const vermelhoFiap = "#ED1C24";

  return (
    <View style={styles.container}>
      <Ionicons 
        name={isDarkMode ? "moon" : "moon-outline"} 
        size={20} 
        color={vermelhoFiap} 
      />
      
      <Switch
        value={!isDarkMode} 
        onValueChange={onToggle}
        trackColor={{ false: "#333", true: vermelhoFiap }}
        thumbColor="#FFF"
        ios_backgroundColor="#333"
      />
      
      <Ionicons 
        name={isDarkMode ? "sunny-outline" : "sunny"} 
        size={22} 
        color={vermelhoFiap} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(100, 100, 100, 0.1)", 
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 8,
  },
});