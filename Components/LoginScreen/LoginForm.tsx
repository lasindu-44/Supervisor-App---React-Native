import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginForm = (prop: any) => {
  const [form, setForm] = useState({
    userName: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const Stack = prop.stack;

  const handleLogin = async () => {
    // 🔹 Simple validation
    if (!form.userName.trim()) {
      Alert.alert('Validation', 'Username is required');
      return;
    }

    if (!form.password.trim()) {
      Alert.alert('Validation', 'Password is required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://10.0.2.2:5192/api/SignIn/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          userName: form.userName,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Login Failed', data?.message ?? 'Invalid credentials');
        return;
      }

      Stack.navigate('UserDetails', { user: data });
      
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.loginparentview}>
    
 <View style={styles.userNameparentview}>
        <TextInput
          style={styles.textinputstyle}
          placeholder="Enter User Name "
          value={form.userName}
          onChangeText={text => setForm(prev => ({ ...prev, userName: text }))}
          autoCapitalize="none"
        ></TextInput>
      </View>
      <View style={styles.userNameparentview}>
        <TextInput
          style={styles.textinputstyle}
          placeholder="Password"
          value={form.password}
          onChangeText={text => setForm(prev => ({ ...prev, password: text }))}
          secureTextEntry
        ></TextInput>
      </View>

      <View style={styles.SigninParentview}>
        <View style={styles.signinchildview1}>
          <Text style={styles.textinchil1dview1}>Sign in</Text>
        </View>
        <View style={styles.signinchildview2}>
          <TouchableOpacity onPress={handleLogin} disabled={loading}>
            <View
              style={{
                backgroundColor: loading ? '#ccc' : '#b0cbff',
                width: 50,
                height: 50,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {loading ? (
                <ActivityIndicator color="#333" />
              ) : (
                <Ionicons name="arrow-forward-sharp" size={24} color="#333" />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    
     
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({

   loginparentview: {
    flex:1,
    //position: 'absolute',
    marginHorizontal: 20,
    marginTop: 450,
  },
  userNameparentview: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    width: 300,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  textinputstyle: { fontWeight: 'bold' },
  SigninParentview: {
    //backgroundColor: 'blue',
    //position: 'absolute',
    height: 50,
    marginTop: 40,
    flexDirection: 'row',
  },
  signinchildview1: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  textinchil1dview1: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signinchildview2: {
    flex: 1,
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 30,
  },
});
