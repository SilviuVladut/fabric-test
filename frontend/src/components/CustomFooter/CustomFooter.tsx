import React from "react";
import {Center, Footer, Text} from "@mantine/core";

export const CustomFooter = () => {
  return (
    <Footer height={50} bg="gray.0">
      <Center mt={20}>
        <Text ta="center">Fabric - Technical Test © 2023</Text>
      </Center>
    </Footer>
  );
};
