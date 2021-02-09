import { Flex, Box, Center, Text } from "@chakra-ui/react";
import { useState } from "@hookstate/core";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface IFlexPhoneInputProps {
    is_button_visiable: boolean | null;
    onSendClick?: (phone_number: string) => any;
}

export const FlexPhoneInput = (props: IFlexPhoneInputProps) => {
    const phone_number = useState("");

    return (
        <>
            <Text>Phome number</Text>
            <Flex className="phone_input" padding="10px 0px">
                <Box w="80%" overflow="hidden">
                    <PhoneInput onlyCountries={["vn"]} country={"vn"} buttonStyle={{ backgroundColor: "white", border: "none" }} inputStyle={{ border: "none", fontWeight: "bold", fontSize: "17px" }} value={phone_number.value} onChange={(value) => phone_number.set(value)} />
                </Box>
                <Center borderRadius="full" bg="#C51FFF" padding="0px 10px" fontWeight="bold" color="white" onClick={() => props.onSendClick && props.onSendClick(phone_number.value)} hidden={props.is_button_visiable ? false : !props.is_button_visiable}>
                    SEND
                </Center>
            </Flex>
            <Box className="line_footer" w="100%" h="2px" borderRadius="full" bg="#D1D1D1" />
        </>
    )
}
