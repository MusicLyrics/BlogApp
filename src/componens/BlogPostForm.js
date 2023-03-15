import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const BlogPostForm = ({ onSubmit, initialValues }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

  return (
    <View>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        style={styles.contentInput}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.contentInput}
        value={content}
        onChangeText={text => setContent(text)}
      />
      <Button title="Save Blog Post" onPress={() => onSubmit(title, content)} />
    </View>
  );
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: '',
    content: ''
  }
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 0.3,
        borderColor: 'black',
        borderRadius: 5,
        marginVertical: 2,
        marginBottom: 30,
        padding: 5,
        margin: 5,
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
    },
    contentInput: {
        fontSize: 18,
        borderWidth: 0.3,
        borderColor: 'black',
        borderRadius: 5,
        marginVertical: 2,
        marginBottom: 30,
        padding: 5,
        margin: 5,
    }
});

export default BlogPostForm;