import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsignEmployeetoDepartment from './AsignEmployeetoDepartment';
import AddHourlyPieceRate from '../../Components/HourlyRate/AddHourlyPieceRate';

const HourlyRate = (prop: any) => {

    const userDetails:any = prop.route.params.UserDetails;
    console.log('Hourly Rate Screen - User Details:', userDetails);
  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          //onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{userDetails.firstName + ' ' + userDetails.lastName}</Text>

        {/* Empty view to keep title centered */}
        <View style={{ width: 50 }} />
      </View>

        <AddHourlyPieceRate userId={userDetails.id} />

    </View>
  );
};

export default HourlyRate;

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
});
