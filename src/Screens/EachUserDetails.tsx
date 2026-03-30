import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//type Person = { id: string; name: string };

export default function UserDetailsScreen(prop: any) {
  const UserDetails: any = prop.route.params.user;
  const Stack = prop.navigation;
  const user = {
    // fullName:FullName,
    department: 'Sales',
    userType: 'Contractor',
    avatar: "https://ui-avatars.com/api/?name=lasindu+Doe&size=300&background=1D4ED8&color=ffffff"
 // sample profile image
  };

  // Button actions (you will later connect these to real screens / API calls)
  const handleAssignCompany = () => {
    console.log('Assign to another company pressed');
    Stack.navigate('AsignDepartment', { user: user, UserDetails: UserDetails });
    // navigation.navigate("AssignCompany", { user });
  };


 const SignOutUser = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:5192/api/SignIn/SignOutEmployee?userId=${UserDetails.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }
        
        },
      );

      const data = await response.json();
      console.log('UpdateHourlyRate Response:', data);

      if (!response.ok) {
        Alert.alert('Error', data?.message ?? 'Failed to SignOut User');
        return;
      }

      Alert.alert('Success', 'User Sign Out successfully');
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'Network error');
    }
  };

const handleSignOut = () => {
  Alert.alert(
    "Confirm Sign Out", // Title
    "Are you sure you want to sign out this User?", // Message
    [
      {
        text: "Cancel",
        onPress: () => console.log("Sign out cancelled"),
        style: "cancel"
      },
      {
        text: "Yes, Sign Out",
        onPress: () => {
          console.log("Signing out...");
         SignOutUser();
        },
        style: "destructive"
      }
    ],
    { cancelable: true } // Tap outside to dismiss
  );
};


  const handleAddHourlyRate = () => {
    console.log('Add hourly rate pressed');
        Stack.navigate('HourlyRate', { UserDetails: UserDetails  });

  };

   const handleSummeryReport = () => {
    //console.log('Assign to another company pressed');
    Stack.navigate('SummeryReport', { user: user, UserDetails: UserDetails });
    // navigation.navigate("AssignCompany", { user });
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          //onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>User Details : {UserDetails.departmentName}</Text>

        {/* Empty view to keep title centered */}
        <View style={{ width: 50 }} />
      </View>

      {/* Profile Card */}
      <View style={styles.card}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />

        <Text style={styles.name}>{UserDetails.firstName + ' ' + UserDetails.lastName}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Department: </Text>
          <Text style={styles.value}>{UserDetails.departmentName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>User Type: </Text>
          <Text style={styles.value}>{UserDetails.userTypeName}</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsArea}>
        <ActionButton
          icon="business"
          text="Assign to Another Company"
          style={styles.btnBlue}
          onPress={handleAssignCompany}
        />

     

        <ActionButton
          icon="cash"
          text="Add Hourly Rate"
          style={styles.btnGreen}
          onPress={handleAddHourlyRate}
        />
           <ActionButton
          icon="power"
          text="Sign Out User"
          style={styles.btnRed}
          onPress={handleSignOut}
        />
          <ActionButton
          icon="document-text"
          text="Summery Report"
          style={styles.btninfo}
          onPress={handleSummeryReport}
        />
      </View>
    </SafeAreaView>
  );
}

/**
 * Reusable Button Component
 * This is used 3 times to avoid repeating the same code.
 */
function ActionButton({ icon, text, style, onPress }:any) {
  return (
    <TouchableOpacity style={[styles.actionBtn, style]} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#fff" style={styles.btnIcon} />
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

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
    marginLeft:20
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
    marginHorizontal:10
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
  btnRed: {
    backgroundColor: '#EF4444',
  },
  btnGreen: {
    backgroundColor: '#16A34A',
  },
   btninfo: {
    backgroundColor: '#0EA5e9',
  },
});
