import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AssignDepartment from '../../Components/AsignDepartment/AsignDepartment';

type UserDetails = { department: string; userType: string; avatar: string };

const updateUserDepartment = async (
  userId: number,
  newDepartmentId: number,
) => {
  try {
    const res = await fetch(
      `http://10.0.2.2:5192/api/SignIn/${userId}/asigndepartment`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ departmentId: newDepartmentId }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      Alert.alert('Error', data?.message || 'Failed to update department.');
      return false;
    }

    return true;
  } catch (err: any) {
    Alert.alert('Error', err.message || 'Network error.');
    return false;
  }
};

const AsignEmployeetoDepartment = (prop: any) => {
  const UserDetails: any = prop.route.params.UserDetails;
  const user: UserDetails = prop.route.params.user;

  const [currentDepartment, setCurrentDepartment] = useState(
    UserDetails.departmentId,
  );
  const [currentDepartmentname, setCurrentDepartmentname] = useState(
    UserDetails.departmentName,
  );

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          //onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          User Details : {UserDetails.departmentName}
        </Text>

        {/* Empty view to keep title centered */}
        <View style={{ width: 50 }} />
      </View>

      {/* Profile Card */}
      <View style={styles.card}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />

        <Text style={styles.name}>
          {UserDetails.firstName + ' ' + UserDetails.lastName}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Current DepartmentId: </Text>
          <Text style={styles.value}>{currentDepartment}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Current Department: </Text>
          <Text style={styles.value}>{currentDepartmentname}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>User Type: </Text>
          <Text style={styles.value}>{UserDetails.userTypeName}</Text>
        </View>
      </View>

      {/* Assign Department Card*/}
      <AssignDepartment
        department={currentDepartment}
        departmentname={currentDepartmentname}
        handleConfirm={async (
          newDepartment: number,
          departmentName: string,
        ) => {
          console.log('New Department ID:', newDepartment);
          console.log('New Department Name:', departmentName);

          if (newDepartment !== currentDepartment) {
            const ok = await updateUserDepartment(
              UserDetails.id,
              newDepartment,
            );

            if (ok) {
              Alert.alert(`User assigned to ${departmentName} department.`);

              setCurrentDepartment(newDepartment);
              setCurrentDepartmentname(departmentName);
              prop.navigation.navigate('UserDetails', {
                user: {
                  message: 'Login successful',
                  department: currentDepartment,
                  token: 'fake-jwt-token-for-now',
                },
              });

              // loadUsers();
            }
          } else if (newDepartment === currentDepartment) {
            Alert.alert(
              'No Change: The user is already assigned to this department.',
            );
          }
        }}
      />
    </View>
  );
};

export default AsignEmployeetoDepartment;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  /** Header **/
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  /** Card **/
  card: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    color: '#6B7280',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
});
