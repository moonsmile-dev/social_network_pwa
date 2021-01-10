import { Flex, Box, Center, Text } from "@chakra-ui/react"
import React from "react"
import PhoneInput from "react-phone-input-2"

export const FlexPhoneInput = (props: any) => {
    return (
        <>
            <Text>Phome number</Text>
            <Flex className="phone_input" padding="10px 0px">
                <Box w="80%" overflow="hidden">
                    <PhoneInput onlyCountries={["vn"]} country={"vn"} buttonStyle={{ backgroundColor: "white", border: "none" }} inputStyle={{ border: "none", fontWeight: "bold", fontSize: "17px" }} />
                </Box>
                <Center borderRadius="full" bg="#C51FFF" padding="0px 10px" fontWeight="bold" color="white">
                    SEND
                        </Center>
            </Flex>
            <Box className="line_footer" w="100%" h="2px" borderRadius="full" bg="#D1D1D1" />
        </>
    )
}
