import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Hàm kiểm tra validation số điện thoại
  const validatePhone = (text) => {
    const phoneRegex = /^[0-9]{10}$/; // Số điện thoại có đúng 10 số
    return phoneRegex.test(text);
  };

  // Hàm xử lý khi bấm "Tiếp tục"
  const handleContinue = () => {
    const plainPhone = phone.replace(/\s/g, ''); // Loại bỏ khoảng trắng để kiểm tra
    if (validatePhone(plainPhone)) {
      Alert.alert("Thành công", "Số điện thoại hợp lệ!");
      setIsValid(true);
    } else {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ. Hãy nhập đúng 10 chữ số.");
      setIsValid(false);
    }
  };

  // Hàm xử lý khi nhập (tự động format lại số điện thoại)
  const handlePhoneChange = (text) => {
    const formattedText = text.replace(/\D/g, '') // Xóa hết ký tự không phải số
                              .replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3'); // Format lại theo dạng 090 123 4567
    setPhone(formattedText);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Đăng nhập</Text>
      <Text style={styles.subtitle}>Nhập số điện thoại</Text>
      <Text style={styles.description}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
      </Text>
      <TextInput
        style={[styles.input, !isValid && styles.inputError]}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="numeric"
        value={phone}
        onChangeText={handlePhoneChange}  // Tự động format số khi nhập
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: phone.length === 0 ? '#ccc' : '#007BFF' }]} 
        disabled={phone.length === 0}  // Disable button nếu không có gì nhập
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;