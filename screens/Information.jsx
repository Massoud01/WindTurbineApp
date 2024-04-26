import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";

const Information = () => {
  const teamMembers = [
    { name: "Ali El Zein", role: "Mechanical Engineer" },
    { name: "Massoud Nohra", role: "Software Engineer" },
    { name: "Ali El Moussaoui ", role: "Mechanical Engineer" },
    { name: "Khalil Akroush", role: "Electrical Engineer" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Information</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Introduction</Text>
            <Text style={styles.sectionText}>
              The wind turbine design focused on enhancing aerodynamic
              performance and structural integrity, leveraging advanced
              materials and innovative blade configurations. Concurrently, the
              turbine controller development ensures optimal power generation
              under diverse wind conditions, incorporating real-time monitoring,
              adaptive control algorithms, and fault detection mechanisms.
              Moreover, a mobile application provides users with remote access
              to turbine data, performance metrics, and control functionalities,
              fostering greater transparency and user engagement. The
              methodology involved iterative design iterations, computational
              simulations, and optimization processes. Overall, our findings
              highlight the pivotal role of wind energy solutions in mitigating
              energy crises and advancing sustainable development initiatives.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <Text style={styles.sectionText}>
              - Enhanced aerodynamic performance{"\n"}- Structural integrity
              using advanced materials{"\n"}- Innovative blade configurations
              {"\n"}- Real-time monitoring and adaptive control algorithms{"\n"}
              - Fault detection mechanisms
            </Text>
          </View>
          <Text style={styles.sectionTitle}>Special Thanks</Text>
          <Text style={styles.text}>
            This project was done under the supervision of Dr. Robert Farha and
            was carried out by students from multiple disciplines, including
            software engineering, electrical engineering, and mechanical
            engineering.
          </Text>

          {/* Meet the Team Section */}
          <View style={styles.teamSection}>
            <Text style={styles.teamTitle}>Our Team</Text>
            {teamMembers.map((member, index) => (
              <View key={index} style={styles.teamMember}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
            ))}
            <Text style={styles.teamCount}>
              For further information and inquiries, please contact us through
              the contact us page.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    fontFamily: "Poppins_400Regular",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
    color: "#3090e9",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: "#333",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#3090e9",
    fontFamily: "Poppins_400Regular",
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#333",
    fontFamily: "Poppins_400Regular",
  },
  teamSection: {
    marginTop: 24,
    backgroundColor: "#eaeaea",
    padding: 16,
    borderRadius: 10,
  },
  teamTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#3090e9",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  teamMember: {
    marginBottom: 8,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins_400Regular",
  },
  memberRole: {
    fontSize: 14,
    color: "#666",
  },
  teamCount: {
    textAlign: "center",
    marginTop: 8,
    color: "#666",
  },
});

export default Information;
