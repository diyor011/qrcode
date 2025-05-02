import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  label: { fontWeight: 'bold', marginTop: 4 },
  image: { width: 100, height: 100, marginTop: 10 },
});

const BadgePDF = ({ data, imageUrl, qrCodeUrl }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.label}>ID Badge:</Text>
        <Text>{data.id_badge}</Text>
        <Text style={styles.label}>Ism:</Text>
        <Text>{data.first_name}</Text>
        <Text style={styles.label} clas>Familiya:</Text>
        <Text>{data.last_name}</Text>
        <Text style={styles.label}>Otasining ismi:</Text>
        <Text>{data.middle_name}</Text>
        <Text style={styles.label}>Davlat:</Text>
        <Text>{data.country}</Text>
        <Text style={styles.label}>Tug‘ilgan sana:</Text>
        <Text>{data.birth_date}</Text>
        <Text style={styles.label}>Passport:</Text>
        <Text>{data.passport}</Text>
        <Text style={styles.label}>Telefon:</Text>
        <Text>{data.phone}</Text>
      </View>

      {imageUrl && <Image src={imageUrl} style={styles.image} />}
      {qrCodeUrl && <Image src={qrCodeUrl} style={styles.image} />}
    </Page>
  </Document>
);

export default BadgePDF;
