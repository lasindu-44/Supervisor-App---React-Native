import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AssignDepartment = (prop: any) => {
  const currentDepartment: number = prop.department;
  const currentDepartmentname: string = prop.departmentname;

  const [department, setDepartment] = useState(currentDepartment);
  const [departmentname, setDepartmentname] = useState(currentDepartmentname);

  const [departments, setDepartments] = useState<any[]>([]);

  const loadDepartments = async () => {
    try {
      const res = await fetch('http://10.0.2.2:5192/api/SignIn/departments');
      if (!res.ok) throw new Error('Failed to load departments');

      const data = await res.json();
      setDepartments(data);
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      //setLoadingDepts(false);
    }
  };

  // ✅ Load when page opens
  useEffect(() => {
    loadDepartments();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Assign Department</Text>
      <Text style={styles.subtitle}>
        Select a department and confirm the assignment
      </Text>

      <Text style={styles.label}>Department</Text>

      <View style={styles.dropdown}>
        <Picker
          selectedValue={department}
          onValueChange={(value) => {
            setDepartment(value);
            const selectedDepartment = departments.find(d => d.id === value);
            setDepartmentname(selectedDepartment?.name || '');
          }}
        >
          {departments.map(d => (
            <Picker.Item
              key={d.id} // unique key
              label={d.name} // what user sees
              value={d.id} // what you store (recommended)
            />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          (department === null || department === 0) && styles.buttonDisabled,
        ]}
        disabled={department === null || department === 0}
        onPress={() => prop.handleConfirm(department,departmentname)}
      >
        <Text style={styles.buttonText}>Confirm Assignment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AssignDepartment;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#666',
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
