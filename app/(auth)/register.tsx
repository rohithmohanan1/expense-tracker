import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { verticalScale } from '@/utils/styling'
import { colors, spacingX, spacingY } from '@/constants/theme'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input'
import * as Icon from 'phosphor-react-native'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'
import { useAuth } from '@/contexts/authContext'

const Register = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const nameRef = useRef("");
    // const passwordRef = useRef("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { register: registerUser } = useAuth();

    const handleSubmit = async () => {
        if(!emailRef.current || !passwordRef.current || !nameRef.current) {
            Alert.alert('Sign up', "Please fill all the fields");
            return
        }
        setIsLoading(true) 

        const res = await registerUser(
            emailRef.current, 
            passwordRef.current, 
            nameRef.current
        )

        setIsLoading(false)

        console.log('register results: ', res);
        if(!res.success) {
            Alert.alert('Sign up', res.msg);
        }
    }
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />
        <View style={{gap: 5, marginTop: spacingY._20 }}>
            <Typo size={30} fontWeight={"800"}>
                Let's
            </Typo>
            <Typo size={30} fontWeight={"800"}>
                Get Started
            </Typo>
        </View>

        <View style={styles.form}>
            <Typo size={16} color={colors.textLighter}>
                Create an account to track all your expenses
            </Typo>
            <Input 
                placeholder='Enter your name' 
                onChangeText={(value) => (nameRef.current = value)}
                icon={
                    <Icon.User 
                        size={verticalScale(26)} 
                        color={colors.neutral200} 
                        weight='fill'
                    />
                } 
            />
            <Input 
                placeholder='Enter your email' 
                onChangeText={(value) => (emailRef.current = value)}
                icon={
                    <Icon.At 
                        size={verticalScale(26)} 
                        color={colors.neutral200} 
                        weight='fill'
                    />
                } 
            />
            <Input 
                placeholder='Enter your password' 
                secureTextEntry
                onChangeText={(value) => (passwordRef.current = value)}
                icon={
                    <Icon.Lock 
                        size={verticalScale(26)} 
                        color={colors.neutral200} 
                        weight='fill'
                    />
                } 
            />

            <Button loading={isLoading} onPress={handleSubmit}>
                <Typo fontWeight={'700'} color={colors.black}>
                    Sign Up
                </Typo>
            </Button>
        </View>

        <View style={styles.footer}>
            <Typo size={15}>Alrady have an account?</Typo>
            <Pressable onPress={() => router.navigate('/(auth)/login')}>
                <Typo size={15} fontWeight={'700'} color={colors.primary}>
                    Login
                </Typo>
            </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._30,
        paddingHorizontal: spacingX._20,
    },
    welcomeText: {
        fontSize: verticalScale(20),
        fontWeight: "bold",
        color: colors.text,
    },
    form: {
        gap: spacingY._20,
    },
    forgotPassword: {
        textAlign: "right",
        fontWeight: "500",
        color: colors.text,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    footerText: {
        textAlign: "center",
        color: colors.text,
        fontSize: verticalScale(15)
    }
})