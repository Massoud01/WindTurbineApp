import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  ScrollView,
} from "react-native";
import axios from "axios";
import FeatherIcon from "react-native-vector-icons/Feather";
import {ip} from "../config";
const Profile = ({ user }) => {
  const [form, setForm] = useState({
    brakesNotifications: true,
    heaterNotifications: false,
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("");
  const [brakesNotifications, setBrakesNotifications] = useState(true); // Separate state for brakes switch
  const [heaterNotifications, setHeaterNotifications] = useState(false); // Separate state for heater switch

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(`http://${ip}:5000/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setPhoneNumber(response.data.phonenumber);
      setEmail(response.data.email);
      setRole(response.data.role);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <View
            style={[styles.headerAction, { alignItems: "flex-end" }]}
          ></View>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.section, { paddingTop: 4 }]}>
            <Text style={styles.sectionTitle}>Account</Text>

            <View style={styles.sectionBody}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.profile}
              >
                <Image
                  alt=""
                  source={require("../assets/windturbine.png")}
                  style={styles.profileAvatar}
                />

                <View style={styles.profileBody}>
                  <Text style={styles.profileName}>{firstName}</Text>

                  <Text style={styles.profileHandle}>{email}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}
                >
                  <Text style={styles.rowLabel}>Phone Number</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>{phonenumber}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}
                >
                  <Text style={styles.rowLabel}>Role</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>{role}</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.rowWrapper, styles.rowLast]}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Heater Dissipation</Text>

                  <View style={styles.rowSpacer} />

                  <Switch
                    onValueChange={(value) => setHeaterNotifications(value)}
                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    value={heaterNotifications}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Brakes</Text>

                  <View style={styles.rowSpacer} />

                  <Switch
                    onValueChange={(value) => setBrakesNotifications(value)}
                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    value={brakesNotifications}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#3090e9",
    fontFamily: "Poppins_400Regular",
  },
  content: {
    paddingHorizontal: 16,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
  },
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: "500",
    color: "black",
    textTransform: "uppercase",
    fontFamily: "Poppins_400Regular",
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  profile: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileBody: {
    marginRight: "auto",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    fontFamily: "Poppins_400Regular",
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "400",
    color: "#858585",
  },
  row: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: "black",
    fontFamily: "Poppins_400Regular",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ababab",
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    color: "#dc2626",
  },
});

export default Profile;
