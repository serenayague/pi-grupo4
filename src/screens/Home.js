import { Pressable, View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "../firebase/config";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

function Home(props) {
    const [posteos, setPosteos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                props.navigation.navigate("login")
            }
        })

        db.collection("posteos")
            .orderBy("createdAt", "desc")
            .onSnapshot(docs => {
                let posts = []
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setPosteos(posts)
                setLoading(false)
            })
    }, [])

    function handleLike(posteo) {
        const userId = auth.currentUser?.email;
        if (!userId) return;

        const likes = posteo.data.likes || []
        const yaLikeo = likes.includes(userId)

        db.collection("posteos")
            .doc(posteo.id)
            .update({
                likes: yaLikeo
                    ? firebase.firestore.FieldValue.arrayRemove(userId)
                    : firebase.firestore.FieldValue.arrayUnion(userId)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            {
                loading
                    ? <ActivityIndicator size="large" color="#4A90E2" />
                    : <FlatList
                        data={posteos}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => {
                            const userId = auth.currentUser?.email || ""
                            const likes = item.data.likes || []
                            const yaLikeo = userId ? likes.includes(userId) : false

                            return (
                                <View style={styles.post}>

                                    <Text style={styles.postOwner}>
                                        {item.data.nombreUsuario || item.data.email}
                                    </Text>

                                    <Text style={styles.postTexto}>
                                        {item.data.descripcion}
                                    </Text>

                                    {item.data.imagen &&
                                        <Image
                                            source={{ uri: item.data.imagen }}
                                            style={styles.imagen}
                                        />
                                    }

                                    <View style={styles.acciones}>

                                        <Pressable
                                            style={styles.likeBtn}
                                            onPress={() => handleLike(item)}
                                        >
                                            <FontAwesome
                                                name={yaLikeo ? "heart" : "heart-o"}
                                                size={20}
                                                color={yaLikeo ? "#e74c3c" : "#999"}
                                            />
                                            <Text style={styles.likeTexto}>
                                                {likes.length} likes
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            style={styles.comentarBtn}
                                            onPress={() =>
                                                props.navigation.navigate(
                                                    "comentarPost",
                                                    { posteoId: item.id }
                                                )
                                            }
                                        >
                                            <Text style={styles.comentarTexto}>
                                                Comentar
                                            </Text>
                                        </Pressable>

                                    </View>
                                </View>
                            )
                        }}
                      
                    />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#333"
    },
    post: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 14,
        marginBottom: 14,
        elevation: 2
    },
    postOwner: {
        fontWeight: "bold",
        fontSize: 14,
        marginBottom: 6,
        color: "#333"
    },
    postTexto: {
        fontSize: 14,
        color: "#555",
        marginBottom: 10
    },
    imagen: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginBottom: 10
    },
    acciones: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    likeBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    likeTexto: {
        color: "#999",
        fontSize: 13
    },
    comentarBtn: {
        backgroundColor: "#4A90E2",
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 6
    },
    comentarTexto: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600"
    },
    sinPosteos: {
        textAlign: "center",
        color: "#999",
        marginTop: 40
    }
})

export default Home