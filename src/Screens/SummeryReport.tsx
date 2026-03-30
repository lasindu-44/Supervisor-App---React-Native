import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SummerCard from '../../Components/SummeryReport/SummeryCard';

const SummeryReport = (prop: any) => {
  const UserDetails: any = prop.route.params.UserDetails;
  return (
    <View style={styles.safe}>
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
    <SummerCard user={UserDetails} />

    </View>
  );
};

export default SummeryReport;

const styles = StyleSheet.create({
  safe: {
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
