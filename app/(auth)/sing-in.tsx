
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useCallback, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link } from 'expo-router';
import OAuth from "@/components/OAtuh";
import { useSignIn } from '@clerk/clerk-expo'
import { useRouter } from "expo-router";



const SingIN = () => {

    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [form, setForm] = useState({
        email: "",
        password: "",
      });

      const onSignInPress = useCallback(async () => {
        if (!isLoaded) {
          return
        }
    
        try {
          const signInAttempt = await signIn.create({
            identifier: form.email,
            password: form.password,
          })
    
          if (signInAttempt.status === 'complete') {
            await setActive({ session: signInAttempt.createdSessionId })
            router.replace('/')
          } else {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(signInAttempt, null, 2))
          }
        } catch (err: any) {
          console.error(JSON.stringify(err, null, 2))
        }
      }, [isLoaded, form.email, form.password])

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[290px]">
                    <Image 
                        source={images.signUpCar} 
                        style={{ width: 90, height: undefined, aspectRatio: 90 }} 
                        resizeMode="contain"
                        className="z-0 self-center" 
                    />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-[150px] left-3 font-bold">
                        Sign In
                    </Text>
                </View>
                <View className="p-5 bottom-10">
                    <View className="p-5 bottom-[130px]">
                        <InputField
                        label="Email"
                        placeholder="Enter email"
                        icon={icons.email}
                        textContentType="emailAddress"
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                        />
                        <InputField
                        label="Password"
                        placeholder="Enter password"
                        icon={icons.lock}
                        secureTextEntry={true}
                        textContentType="password"
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                        />
                        <CustomButton
                        title="Sign In"
                        onPress={onSignInPress}
                        className="mt-6"
                        />
                        <OAuth />
                        <Link
                        href="/(auth)/sing-up"
                        className="text-lg text-center text-general-200 mt-10"
                        >
                        Don't have an account!{" "}
                        <Text className="text-primary-500">Log Up</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default SingIN;