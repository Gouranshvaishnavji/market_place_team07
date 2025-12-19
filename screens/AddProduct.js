import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../services/supabase';

const ProductSchema = Yup.object().shape({
  title: Yup.string()
    .required('Product Title is required'),
  description: Yup.string()
    .required('Product Description is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than 0')
    .required('Price is required'),
  image: Yup.string()
    .required('Product Image is required'),
});

export default function AddProduct() {
  const [uploading, setUploading] = useState(false);

  const uploadImageToSupabase = async (uri) => {
    try {
      setUploading(true);
      const filename = `products/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
      
      const response = await fetch(uri);
      const arrayBuffer = await response.arrayBuffer();

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filename, arrayBuffer, {
          contentType: 'image/jpeg',
        });

      if (error) {
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filename);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert('Upload Failed', error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const pickImage = async (setFieldValue) => {
    Alert.alert(
      "Select Image",
      "Choose an option",
      [
        {
          text: "Camera",
          onPress: async () => {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
            if (permissionResult.granted === false) {
              Alert.alert("Permission to access camera is required!");
              return;
            }
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.7,
            });
            if (!result.canceled) {
              setFieldValue('image', result.assets[0].uri);
            }
          }
        },
        {
          text: "Gallery",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.7,
            });
            if (!result.canceled) {
              setFieldValue('image', result.assets[0].uri);
            }
          }
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>List a New Product</Text>

      <Formik
        initialValues={{ title: '', description: '', price: '', image: null }}
        validationSchema={ProductSchema}
        onSubmit={async (values, { resetForm }) => {
          if (!values.image) return;
          
          const publicUrl = await uploadImageToSupabase(values.image);
          
          if (publicUrl) {
            console.log('Form Values:', { ...values, imageUrl: publicUrl });
            Alert.alert('Success', 'Product Submitted Successfully');
            resetForm();
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, isValid, dirty }) => (
          <View style={styles.formContainer}>
            
            {/* Product Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Product Title</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.title && errors.title ? styles.inputError : null
                ]}
                placeholder="e.g., Vintage Camera"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              {touched.title && errors.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}
            </View>

            {/* Product Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  touched.description && errors.description ? styles.inputError : null
                ]}
                placeholder="Describe your item..."
                multiline
                numberOfLines={4}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                textAlignVertical="top"
              />
              {touched.description && errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
            </View>

            {/* Product Price */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Price ($)</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.price && errors.price ? styles.inputError : null
                ]}
                placeholder="0.00"
                keyboardType="numeric"
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price}
              />
              {touched.price && errors.price && (
                <Text style={styles.errorText}>{errors.price}</Text>
              )}
            </View>

            {/* Image Upload Placeholder */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Product Image</Text>
              <TouchableOpacity onPress={() => { pickImage(setFieldValue); handleBlur('image'); }}>
                {values.image ? (
                  <Image source={{ uri: values.image }} style={styles.imagePreview} />
                ) : (
                  <View style={[
                    styles.imagePlaceholder,
                    touched.image && errors.image ? styles.inputError : null
                  ]}>
                    <Text style={styles.imagePlaceholderText}>+ Upload Image</Text>
                    <Text style={styles.imagePlaceholderSubText}>(Tap to select)</Text>
                  </View>
                )}
              </TouchableOpacity>
              {touched.image && errors.image && (
                <Text style={styles.errorText}>{errors.image}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.button,
                (!isValid || !dirty) ? styles.buttonDisabled : null
              ]}
              onPress={handleSubmit}
              disabled={!isValid || !dirty}
            >
              <Text style={styles.buttonText}>Submit Product</Text>
            </TouchableOpacity>

          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 100,
  },
  inputError: {
    borderColor: '#ff4444',
    backgroundColor: '#fff0f0',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 5,
  },
  imagePlaceholder: {
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  imagePlaceholderSubText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#a0cfff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
