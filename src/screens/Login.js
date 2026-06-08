import { useEffect, useState } from "react";
import { Pressable, TextInput, View, Text, StyleSheet } from "react-native";
import { auth } from "../firebase/config";

function Login(props) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPass, setErrorPass] = useState("");
    const [errorL, setErrorL] = useState("");

    function validar() {
        let valido = true;
        setErrorEmail("");
        setErrorPass("");
        setErrorL("");

        if (email === "") {
            setErrorEmail("El email es obligatorio");
            valido = false;
        } else if (!email.includes("@")) {
            setErrorEmail("El email no es válido");
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

        auth.signInWithEmailAndPassword(email, pass)
            .then(res => {
                props.navigation.navigate("homeMenu");
            })
            .catch(e => {
                setErrorL("Credenciales inválidas");
            });
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                props.navigation.navigate("homeMenu");
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

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
                placeholder="Contraseña"
                onChangeText={text => setPass(text)}
                value={pass}
                secureTextEntry={true}
            />
            {errorPass ? <Text style={styles.error}>{errorPass}</Text> : null}

            {errorL ? <Text style={styles.error}>{errorL}</Text> : null}

            <Pressable onPress={() => onSubmit()}>
                <Text style={styles.boton}>Loguearme</Text>
            </Pressable>

            <Pressable onPress={() => props.navigation.navigate("registro")}>
                <Text style={styles.boton}>No tengo cuenta, registrarme</Text>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    boton: {
        backgroundColor: '#007AFF',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        marginTop: 10,
        width: 200,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 5,
    }
});

export default Login;