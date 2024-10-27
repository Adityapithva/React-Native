import { Stack } from "expo-router";
import React from "react";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="Login"  options={{title:"Login"}}/>
      <Stack.Screen name="Register" options={{title:"Register"}}/>
    </Stack>
  );
}
