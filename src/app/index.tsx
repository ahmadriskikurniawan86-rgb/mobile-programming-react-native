
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [photos, setPhotos] = useState<{ id: string; uri: string }[]>([]);

  const loadPhotos = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    setPhotos(
      result.assets.map((asset, index) => ({
        id: asset.assetId ?? `${asset.uri}-${index}`,
        uri: asset.uri,
      }))
    );
  } catch (error) {
    console.error('Gagal memilih foto:', error);
    Alert.alert('Terjadi kesalahan', String(error));
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Belajar React Native</Text>

        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.image}
        />

        <TextInput
          style={styles.input}
          placeholder="Masukkan nama kamu"
        />

        <Button
          title="Tampilkan Alert"
          onPress={() => Alert.alert('Primakara Luar Biasa')}
        />

        <View style={styles.box1} />
        <View style={styles.box2} />
        <View style={styles.box3} />

        <View style={styles.galleryButton}>
          <Button
            title="Pilih Maksimal 10 Foto"
            onPress={loadPhotos}
          />
        </View>

        <View style={styles.gallery}>
          {photos.map((photo) => (
            <Image
              key={photo.id}
              source={{ uri: photo.uri }}
              style={styles.galleryImage}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  box1: {
    flex: 1,
    backgroundColor: 'powderblue',
  },
  box2: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  box3: {
    flex: 1,
    backgroundColor: 'steelblue',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  galleryButton: {
    marginTop: 20,
    marginBottom: 16,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  galleryImage: {
    width: 100,
    height: 100,
  },
});

