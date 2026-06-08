import { useState } from "react";
import { Pressable, TextInput, View, Text, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

function Registro(props) {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorUser, setErrorUser] = useState("");
    const [errorPass, setErrorPass] = useState("");
    const [errorR, setErrorR] = useState("");

    function validar() {
        let valido = true;
        setErrorEmail("");
        setErrorUser("");
        setErrorPass("");
        setErrorR("");

        if (email === "") {
            setErrorEmail("El email es obligatorio");
            valido = false;
        } else if (!email.includes("@")) {
            setErrorEmail("El email no es válido");
            valido = false;
        }

        if (user === "") {
            setErrorUser("El nombre de usuario es obligatorio");
            valido = false;
        }

        if (pass === "") {
            setErrorPass("La contraseña es obligatoria");
            valido = false;
        } else if (pass.length < 6) {
            setErrorPass("La contraseña debe tener al menos 6 caracteres");
            valido = false;
        }

        return valido;
    }

    function onSubmit() {
        if (!validar()) return;

        auth.createUserWithEmailAndPassword(email, pass)
            .then(res => {
                db.collection("users").add({
                    email: email,
                    username: user,
                    createdAt: Date.now()
                })
                .then(() => {
                    props.navigation.navigate("login");
                })
                .catch(e => console.log(e));
            })
            .catch(err => {
                setErrorR(err.message);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {errorEmail ? <Text style={styles.error}>{errorEmail}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                onChangeText={text => setUser(text)}
                value={user}
            />
            {errorUser ? <Text style={styles.error}>{errorUser}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                onChangeText={text => setPass(text)}
                secureTextEntry={true}
                value={pass}
            />
            {errorPass ? <Text style={styles.error}>{errorPass}</Text> : null}

            {errorR ? <Text style={styles.error}>{errorR}</Text> : null}

            <Pressable onPress={() => onSubmit()}>
                <Text style={styles.boton}>Registrarme</Text>
            </Pressable>

            <Pressable onPress={() => props.navigation.navigate("login")}>
                <Text style={styles.boton}>Ya tengo cuenta, loguearme</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#878787",
        borderRadius: 8,
        padding: 10,
        marginVertical: 4,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 24,
        margin: 16,
    },
    boton: {
        textAlign: "center",
        backgroundColor: "#3690ff",
        color: "white",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: 200,
    },
    error: {
        color: "red",
        fontSize: 12,
        marginBottom: 5,
        alignSelf: "flex-start",
    }
});

export default Registro;