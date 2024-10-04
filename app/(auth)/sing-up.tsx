
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link } from 'expo-router';
import OAuth from "@/components/OAtuh";
import { useSignUp } from '@clerk/clerk-expo'
import { ReactNativeModal } from "react-native-modal";
import { router } from "expo-router";
import { fetchAPI } from '@/lib/fetch';



const SingUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp()
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
      });
    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
      });
      const onSignUpPress = async () => {
        if (!isLoaded) {
          return
        }
    
        try {
          await signUp.create({
            emailAddress: form.email,
            password: form.password,
          })
    
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    
          setVerification({
            ...verification,
            state: "pending",
          });
        } catch (err: any) {
          
          Alert.alert("Error", err.errors[0].longMessage);
        }
      }
    
      const onPressVerify = async () => {
        if (!isLoaded) return;

        try {
          const completeSignUp = await signUp.attemptEmailAddressVerification({
            code: verification.code,
          })
    
          if (completeSignUp.status === 'complete') {
            await fetchAPI("/(api)/user", {
              method: "POST",
              body: JSON.stringify({
                name: form.name,
                email: form.email,
                clerkId: completeSignUp.createdUserId,
              }),
            });
            await setActive({ session: completeSignUp.createdSessionId })
            setVerification({
          ...verification,
          state: "success",
        });
          } else {
            setVerification({
                ...verification,
                error: "Verification failed. Please try again.",
                state: "failed",
              });
          }
        } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };
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
                        Create Your Account
                    </Text>
                </View>
                <View className="p-5 bottom-10">
                    <View className="p-5 bottom-[130px]">
                        <InputField
                        label="Name"
                        placeholder="Enter name"
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value) => setForm({ ...form, name: value })}
                        />
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
                        title="Sign Up"
                        onPress={onSignUpPress}
                        className="mt-6"
                        />
                        <OAuth />
                        <Link
                        href="/(auth)/sing-in"
                        className="text-lg text-center text-general-200 mt-10"
                        >
                        Already have an account?{" "}
                        <Text className="text-primary-500">Log In</Text>
                        </Link>
                    </View>


                    <ReactNativeModal 
                    isVisible={verification.state === "pending"}

                    onModalHide={() => {
                        if (verification.state === "success") {
                            setShowSuccessModal(true);
                          }
                        }}
                    >
                        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                            <Text className="font-JakartaExtraBold text-2xl mb-2">
                                Verification
                                </Text>
                                <Text className="font-Jakarta mb-5">
                                    We've sent a verification code to {form.email}
                                </Text>
                                <InputField
                                label={"Code"}
                                icon={icons.lock}
                                placeholder={"12345"}
                                value={verification.code}
                                keyboardType="numeric"
                                onChangeText={(code) =>
                                    setVerification({ ...verification, code })
                                }
                                />
                                {verification.error && (
                                    <Text className="text-red-500 text-sm mt-1">
                                        {verification.error}
                                        </Text>
                                    )}
                                    <CustomButton
                                    title="Verify Email"
                                    style={{ backgroundColor: "#cfa970" }}
                                    onPress={onPressVerify}
                                    className="mt-5 bg-success-500 #cfa970"
                                    />
                        </View>


                    </ReactNativeModal>                                                              


                    
                    <ReactNativeModal isVisible={showSuccessModal}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Image
                        source={images.check}
                        className="w-[110px] h-[110px] mx-auto my-5"
                        />
                        <Text className="text-3xl font-JakartaBold text-center">
                            Verified
                        </Text>
                        <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                            You have successfully verified your account.
                        </Text>
                        <CustomButton
                        title="Browse Home"
                        onPress={() => router.push(`/(root)/(tabs)/home`)}
                        className="mt-5"
                        />
                        </View>
                    </ReactNativeModal>

                </View>
            </View>
        </ScrollView>
    );
};

export default SingUp;