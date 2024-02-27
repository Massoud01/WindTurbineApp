import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Switch, SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';
import FeatherIcon from 'react-native-vector-icons/Feather';
const Profile = ({ user }) => {
    const [form, setForm] = useState({
        emailNotifications: true,
        pushNotifications: false,
    });
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState(null);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(false);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);
        };
        fetchToken();
    }, []);

    const getUser = async () => {
        try {
            const response = await axios.get('http://192.168.1.113:5000/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setPhoneNumber(response.data.phonenumber);
            setEmail(response.data.email);
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
                        <TouchableOpacity
                            onPress={() => {
                                // handle onPress
                            }}>
                            <FeatherIcon
                                color="#000"
                                name="more-vertical"
                                size={24} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={[styles.section, { paddingTop: 4 }]}>
                        <Text style={styles.sectionTitle}>Account</Text>

                        <View style={styles.sectionBody}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.profile}>
                                <Image
                                    alt=""
                                    source={{
                                        uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                                    }}
                                    style={styles.profileAvatar} />

                                <View style={styles.profileBody}>
                                    <Text style={styles.profileName}>{firstName}</Text>

                                    <Text style={styles.profileHandle}>
                                        {email}
                                    </Text>
                                </View>

                                <FeatherIcon
                                    color="#bcbcbc"
                                    name="chevron-right"
                                    size={22} />
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
                                    style={styles.row}>
                                    <Text style={styles.rowLabel}>Phone Number</Text>

                                    <View style={styles.rowSpacer} />

                                    <Text style={styles.rowValue}>{phonenumber}</Text>

                                    <FeatherIcon
                                        color="#bcbcbc"
                                        name="chevron-right"
                                        size={19} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.rowWrapper}>
                                <TouchableOpacity
                                    onPress={() => {
                                        // handle onPress
                                    }}
                                    style={styles.row}>
                                    <Text style={styles.rowLabel}>Location</Text>

                                    <View style={styles.rowSpacer} />

                                    <Text style={styles.rowValue}>Los Angeles, CA</Text>

                                    <FeatherIcon
                                        color="#bcbcbc"
                                        name="chevron-right"
                                        size={19} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.rowWrapper}>
                                <View style={styles.row}>
                                    <Text style={styles.rowLabel}>Email Notifications</Text>

                                    <View style={styles.rowSpacer} />

                                    <Switch
                                        onValueChange={emailNotifications =>
                                            setForm({ ...form, emailNotifications })
                                        }
                                        style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                                        value={form.emailNotifications} />
                                </View>
                            </View>

                            <View style={[styles.rowWrapper, styles.rowLast]}>
                                <View style={styles.row}>
                                    <Text style={styles.rowLabel}>Push Notifications</Text>

                                    <View style={styles.rowSpacer} />

                                    <Switch
                                        onValueChange={pushNotifications =>
                                            setForm({ ...form, pushNotifications })
                                        }
                                        style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                                        value={form.pushNotifications} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
    },
    headerAction: {
        width: 40,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 19,
        fontWeight: '600',
        color: '#000',
    },
    content: {
        paddingHorizontal: 16,
    },
    contentFooter: {
        marginTop: 24,
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
        color: '#a69f9f',
    },
    section: {
        paddingVertical: 12,
    },
    sectionTitle: {
        margin: 8,
        marginLeft: 12,
        fontSize: 13,
        letterSpacing: 0.33,
        fontWeight: '500',
        color: '#a69f9f',
        textTransform: 'uppercase',
    },
    sectionBody: {
        borderRadius: 12,
        shadowColor: '#000',
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
        backgroundColor: '#fff',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 9999,
        marginRight: 12,
    },
    profileBody: {
        marginRight: 'auto',
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#292929',
    },
    profileHandle: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: '400',
        color: '#858585',
    },
    row: {
        height: 44,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 12,
    },
    rowWrapper: {
        paddingLeft: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#f0f0f0',
    },
    rowFirst: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    rowLabel: {
        fontSize: 16,
        letterSpacing: 0.24,
        color: '#000',
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    rowValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ababab',
        marginRight: 4,
    },
    rowLast: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    rowLabelLogout: {
        width: '100%',
        textAlign: 'center',
        fontWeight: '600',
        color: '#dc2626',
    },
});
export default Profile;