import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

function CrearPosteo(props) {
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    function onSubmit() {
        if (comment === "") {
            setError("El comentario no puede estar vacío");
            return;
        }

        db.collection("comentarios").add({
            owner: auth.currentUser.email,
            comentario: comment,
            createdAt: Date.now(),
            likes: []
        })
        .then(() => {
            setComment("");
            props.navigation.navigate("stackmenu");
        })
        .catch(error => {
            console.log(error);
            setError("No se pudo publicar el post");
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear nuevo post</Text>

            <TextInput
                style={styles.input}
                placeholder="Escribí tu comentario"
                value={comment}
                onChangeText={text => setComment(text)}
                multiline={true}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable onPress={() => onSubmit()}>
                <Text style={styles.boton}>Publicar post</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        height: 100,
        marginBottom: 10
    },
    boton: {
        backgroundColor: "#007AFF",
        color: "white",
        padding: 12,
        borderRadius: 8,
        textAlign: "center",
        marginTop: 10
    },
    error: {
        color: "red",
        marginBottom: 10
    }
});

export default CrearPosteo;