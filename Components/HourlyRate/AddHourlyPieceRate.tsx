import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

/* ---------- Types ---------- */

type AddHourlyPieceRateProps = {
  userId: any;
};

type TimeSlotValue = {
  hour: string; // "18:30"
  rate: number; // 20, 30, etc.
  oThours: number;
  otRate: number;
};

type HourlyRateViewModel = {
  Hour: string; // "18:30"
  Rate: number; // 20, 30, etc.
  OThours: number;
  OTRate: number;
};

const mapTimeSlotToApi = (
  slot: TimeSlotValue
): HourlyRateViewModel => ({
  Hour: slot.hour,
  Rate: slot.rate,
  OThours: slot.oThours,
  OTRate: slot.otRate,
});


type OTRates = {
  otHours: number; // or number if you want numeric values
  otPieces: number; // or number
};
/* ---------- Component ---------- */

const AddHourlyPieceRate: React.FC<AddHourlyPieceRateProps> = ({ userId }) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlotValue[]>([]);
  const [Otrates, setOtrates] = useState<OTRates>({
    otHours: 0,
    otPieces: 0,
  });

  const UpdateHourlyRate = async () => {
    try {
      // STEP 1: Convert UI state to API model
       const payload: HourlyRateViewModel[] =
      timeSlots.map(mapTimeSlotToApi);
      console.log('Payload',payload);
      console.log('Payload',userId);


      const response = await fetch(
        `http://10.0.2.2:5192/api/SignIn/UpdateHourlyRate?userId=${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();
      console.log('UpdateHourlyRate Response:', data);

      if (!response.ok) {
        Alert.alert('Error', data?.message ?? 'Failed to update hourly rate');
        return;
      }

      Alert.alert('Success', 'Hourly rate updated successfully');
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'Network error');
    }
  };

  const GetShiftTime = async (userId: any) => {
    try {
      const response = await fetch(
        `http://10.0.2.2:5192/api/SignIn/GetShiftTime?userId=${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const data = await response.json();
      console.log('GetShiftTime Response:', data);

      if (!response.ok) {
        Alert.alert('Error', data?.message ?? 'Failed to get shift time');
        return;
      }
      console.log('Redis Data:', data.hourlyRate);
      setTimeSlots(data.hourlyRate);
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'Network error');
    }
  };

  const setOtHours = (hours: string) => {
    const numericHours = Number(hours);
    setOtrates(prev => ({ ...prev, otHours: numericHours }));
    timeSlots[0].oThours = numericHours;
  };

  const setOtPieces = (pieces: string) => {
    const numericPieces = Number(pieces);
    setOtrates(prev => ({ ...prev, otPieces: numericPieces }));
    timeSlots[0].otRate = numericPieces;
  };

  useEffect(() => {
    GetShiftTime(userId);
  }, [userId]);

  useEffect(() => {
    console.log('✅ timeSlots changed:', timeSlots);

    if (timeSlots?.[0] !== undefined && timeSlots?.[0] !== null) {
      console.log('First time slot:', timeSlots[0]);

      setOtrates({
        otHours: timeSlots[0].oThours,
        otPieces: timeSlots[0].otRate,
      });
    }
  }, [timeSlots]);

  useEffect(() => {
    console.log('✅ timeSlots changed based on OT:', timeSlots);
  }, [Otrates]);

  const onChangeValue = (time: string, input: string) => {
    console.log(`Updating time slot', time: ${time}, value: ${input}`);

    const numeric = Number(input.replace(/[^0-9]/g, ''));
    console.log('Parsed numeric value:', numeric);

    setTimeSlots(prev =>
      prev.map(slot =>
        slot.hour === time ? { ...slot, rate: numeric } : slot,
      ),
    );
  };

  /* ---------- UI ---------- */

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.sectionTitle}>Hourly Rate</Text>

      <View style={styles.card}>
        {timeSlots.map(slot => (
          <View key={slot.hour} style={styles.row}>
            <Text style={styles.timeText}>{slot.hour}</Text>

            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={slot.rate.toString()}
              onChangeText={v => onChangeValue(slot.hour, v)}
            />
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Overtime</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.timeText}>OT Hours</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={Otrates.otHours.toString()}
            onChangeText={v => setOtHours(v)}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.timeText}>OT Pieces</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={Otrates.otPieces.toString()}
            onChangeText={v => setOtPieces(v)}
          />
        </View>
      </View>
      {/* Buttons */}
      <View style={styles.buttonsArea}>
        <ActionButton
          icon="business"
          text="Save Rates"
          style={styles.btnBlue}
          onPress={UpdateHourlyRate}
        />
      </View>
    </ScrollView>
  );
};

function ActionButton({ icon, text, style, onPress }: any) {
  return (
    <TouchableOpacity style={[styles.actionBtn, style]} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#fff" style={styles.btnIcon} />
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

export default AddHourlyPieceRate;

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    width: 110,
    height: 42,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  saveBtn: {
    backgroundColor: '#1E74FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'center',
  },

  /** Buttons **/
  buttonsArea: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  actionBtn: {
    height: 64,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginHorizontal: 10,
  },
  btnIcon: {
    marginRight: 12,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  /** Button Colors **/
  btnBlue: {
    backgroundColor: '#1D4ED8',
  },
});
