import React, { use, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

type WorkRecord = {
  id: number;
  userID: number;
  department: string;
  shift: string;
  signOutTime: string;
  totalWorkingHours: number;
  overtimeHours: number;
  dailyPieceCount: number;
};

export default function WorkRecordCard(prop:any) {

    const userId: any = prop.user.id;
    console.log('Summery Report Screen - User ID:', userId);
  const [record,setrecod] = useState<WorkRecord>({
    id: 0,
    userID: 0,
    department: '',
    shift: '',
    signOutTime: '',
    totalWorkingHours: 0,
    overtimeHours: 0,
    dailyPieceCount: 0,
  });

  const formatDateTime = (iso: string) => {
  return new Date(iso).toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

  const GetUserLatestSummery = async (userId: any) => {
    try {
      const response = await fetch(
        `http://10.0.2.2:5192/api/SignIn/GetUserLatestSummery?userId=${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const data = await response.json();
      console.log('UserSummery Response:', data);

      
        setrecod(data);
        
      if (!response.ok) {
        Alert.alert('Error', data?.message ?? 'Failed to get shift time');
        return;
      }
      console.log('Redis Data:', data.hourlyRate);
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'Network error');
    }
  };
  useEffect(() => {
    // Add any side effects here if needed
    GetUserLatestSummery(userId);
  }, [userId]);

    useEffect(() => {
    
    console.log('Record updated:', record);
  }, [record]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Work Record Details</Text>

      <Item label="User ID" value={record.id} />
  
      <Item label="Department" value={record.department} />
      <Item label="Shift ID" value={record.shift} />
      <Item label="Sign-Out Time" value={formatDateTime(record.signOutTime)}/>
      <Item
        label="Total Working Hours"
        value={`${record.totalWorkingHours} hrs`}
      />
      <Item label="Overtime Hours" value={`${record.overtimeHours} hrs`} />
      <Item label="Daily Piece Count" value={record.dailyPieceCount} />
    </View>
  );
}

function Item({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6ff',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginHorizontal: 15,
    marginVertical: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1d4ed8',
  },
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#dbeafe',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d4ed8',
  },
});
