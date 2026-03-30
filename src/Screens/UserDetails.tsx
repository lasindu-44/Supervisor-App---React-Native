import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState ,useEffect} from 'react';

const UserDetails = (navigation: any) => {
  const navigate = navigation.navigation;
  const Department: any = navigation.route.params.user.department;

console.log("DepartmentId" ,Department);
console.log("UserDetails" ,navigation.route.params.user);


  const NavigatetoEachUser = (item: any) => {
    console.log(item);
    navigate.navigate('EachUser', { user: item });
  };
   const [DepartmentName, setDepartmentName] = useState('');
   const [people, setUsers] = useState<any[]>([]);

   const loadUsers = async () => {
   
   
    try {
      // ✅ If calling from Android Emulator use 10.0.2.2 for localhost
      const res = await fetch(
        `http://10.0.2.2:5192/api/SignIn/by-department/${Department}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        },
      );

      if (!res.ok) {
      
        const msg = await res.text();
        throw new Error(msg || `Request failed: ${res.status}`);
      }

      const data = await res.json();
      console.log("Data",data[0].departmentName);
      
      // ✅ If API returns array directly:
      setUsers(Array.isArray(data) ? data : data?.items ?? []);
      setDepartmentName(data[0].departmentName);
      console.log("Users",people);
    } catch (err: any) {
      console.error('Failed to load users:', err.message || err);
    }
  };

  // ✅ load when screen opens OR department changes
  useEffect(() => {
    loadUsers();
  }, [Department]);


  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            //onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>User Details : {DepartmentName}</Text>

          {/* Empty view to keep title centered */}
          <View style={{ width: 50 }} />
        </View>
        <View>
          <FlatList
            data={people}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => NavigatetoEachUser(item)}>
                  <View style={styles.pannel}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{
                            width: 50,
                            height: 50,
                            backgroundColor: '#b0cbff',
                            borderRadius: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Ionicons name="man-sharp" size={24} color="#333" />
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={styles.username}>{item.firstName +' '+ item.lastName}</Text>
                      </View>
                    </View>
                  </View>
                
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#b0cbff',
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
    marginTop: 50,
    width: '100%',
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

  pannel: {
    height: 100,
    width: 350,
    backgroundColor: 'white',
    marginHorizontal: 30,
    marginLeft: 20,
    borderRadius: 30,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    // textAlign: 'center',
    alignSelf: 'flex-start',
  },
});
