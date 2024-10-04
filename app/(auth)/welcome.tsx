import { router } from "expo-router";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constants";
import CustomButton from '@/components/CustomButton';

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;
  
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity onPress={() => {router.replace("/(auth)/sing-up");}}
        className="w-full flex justify-end items-end p-5"
        >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#cfa970] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image 
            source={item.image} 
            className="w-full h-[300px]"
            resizeMode="contain"
            />
            <View className="flex items-row items-center justify-center w-full mt-1">
              <Text className="text-black text-3xl font-blod mx-10 text-center">{item.title}</Text>
            </View>
            <Text className="text-lg front-JakartaSemiBold text-center text-[#9CA3AF] mx-10 mt-10">{item.description}"</Text>
        </View>
        ))}
      </Swiper>

      <CustomButton
      title={isLastSlide ? "Get Started" : "Next"}
      onPress={() => {
        if (isLastSlide) {
          router.replace('/(auth)/sing-up');
        } else {
          swiperRef.current?.scrollBy(1);
        }
  }}
  className="w-11/12 mt-10 mb-5"
/>
    </SafeAreaView>
  );
};

export default Onboarding;


