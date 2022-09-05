import React, {  useState } from 'react';
import { TextInput,Button,StyleSheet,Text,View,Alert } from 'react-native';
import { enviarEmailPsw } from '../axios/axiosClient';
import {useContextState, ActionTypes} from '../contextState'
import { useNavigation } from '@react-navigation/native';


const Form = ({navigation}) => {
    const {contextState,setContextState}=useContextState();
    const [aux,setAux]=useState(true);
    const [cargar, setCargar] = useState(false);
    const [obj, setObj] = useState({
            email: "",
            password: "",
    });
    const validar =async()=>{
    setCargar(true);
    if( obj.email==""||obj.password==""){
    setAux(false)
    }
    else{
         setAux(true)
         try {
            const token =await enviarEmailPsw(obj)
            console.log(token)
            setContextState({
               type: ActionTypes.SetToken,
               value:token,
            });
            navigation.push('Home')
         } catch (err) {
            console.log("error: ", err)
            setCargar(false)
         }
    }
    setCargar(false);
}

    return (      
            <View style={styles.container}>
                
                <Text style={styles.iniciarSesion}>Iniciar Sesión</Text><br></br>
                {!aux &&
                    <Text>No ingreso los valores correspondientes</Text>
                }
                 <TextInput   style={styles.input}
                        
                        placeholder="Usuario"
                        onChangeText={(value)=>{setObj({...obj,email: value})}}
                        value={obj.email}
                    />
                 <TextInput   style={styles.input}
                 placeholder="Contraseña"
                        onChangeText={(value)=>{setObj({...obj,password: value})}}       
                        value={obj.password}
                />
                
                <Button style={styles.button}
                onPress={validar}
                title="Press"

                disabled={cargar}
                />
                
           </View>            
        )
        
}

const styles = StyleSheet.create({

        iniciarSesion:{
            fontSize: 75,
            marginTop:'30px'
            
        },
        container:{
            flex: 1,
            width: '100vw',
            height:'100vh',
            alignItems: 'center',
        
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          },
          button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: 'black',
          },

  });
  
  export default Form;