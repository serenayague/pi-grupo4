import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../firebase/config";

function Perfil(props) {
    const [posteos, setPosteos] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const usuarioActual = auth.currentUser;
        setUser(usuarioActual);

        if (usuarioActual) {
            db.collection("posts")
                .where("email", "==", usuarioActual.email)
                .onSnapshot(docs => {
                    let posteosDelUsuario = [];

                    docs.forEach(doc => {
                        posteosDelUsuario.push({
                            id: doc.id,
                            data: doc.data()
                        });
                    });

                    setPosteos(posteosDelUsuario);
                });
        }
    }, []);

    function logout() {
        auth.signOut()
            .then(() => {
                props.navigation.getParent().navigate("login");
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>

            <Text style={styles.label}>Nombre de usuario:</Text>
            <Text style={styles.info}>
                {user && user.displayName ? user.displayName : "Sin nombre de usuario"}
            </Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.info}>
                {user ? user.email : ""}
            </Text>

            <Text style={styles.subtitle}>Mis posteos</Text>

            <FlatList
                data={posteos}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <Text>{item.data.texto}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>Todavía no hiciste posteos</Text>
                }
            />

            <Pressable onPress={() => logout()}>
                <Text style={styles.logout}>Cerrar sesión</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20
    },
    label: {
        fontWeight: "bold",
        marginTop: 10
    },
    info: {
        marginBottom: 10
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10
    },
    post: {
        backgroundColor: "#f2f2f2",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10
    },
    empty: {
        color: "gray",
        marginTop: 10
    },
    logout: {
        backgroundColor: "red",
        color: "white",
        padding: 12,
        borderRadius: 8,
        textAlign: "center",
        marginTop: 20
    }
});

export default Perfil;