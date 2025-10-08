import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>Aurelio</Text>
        <Text style={styles.subtitle}>Manage Your Store</Text>
        <Text style={styles.description}>
          Monitor sales, manage orders, and grow your business on the go.
        </Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonOutlineText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0ea5e9',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0c4a6e',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#0369a1',
    textAlign: 'center',
    marginBottom: 48,
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
    maxWidth: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#0ea5e9',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    maxWidth: 300,
  },
  buttonOutlineText: {
    color: '#0ea5e9',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

