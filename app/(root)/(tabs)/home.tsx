import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SignedIn } from '@clerk/clerk-expo';
import Map from '@/components/Map';
import { useAuth } from "@clerk/clerk-expo";

export default function Page() {
    const { isSignedIn } = useAuth();
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!isSignedIn) {
            setError("User is not signed in");
        }
        return () => {
            // Add a cleanup function here if necessary
        };
    }, [isSignedIn]);

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SignedIn>
                <Map />
            </SignedIn>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});