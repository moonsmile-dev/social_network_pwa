import { Center, HStack, PinInput, PinInputField, Text } from "@chakra-ui/react"
import React from "react"

const styles = {
    otpInputStyle: {
        height: "90px", border: "none", borderBottom: "solid black 2px", borderRadius: "0", fontWeight: "bold", outline: "none", fontSize: "35px"
    }
}

interface IOTPInputProps {
    headerTxt: string | null;

    onComplete: (value: string) => any;
}

export const OTPInput = (props: IOTPInputProps) => {
    return (
        <>
            <Center>
                <Text fontWeight="bold" opacity="70%" fontSize="30px">{props.headerTxt}</Text>
            </Center>
            <Center boxSize="100%">
                <HStack>
                    <PinInput size="lg" placeholder="" focusBorderColor="none" onComplete={(value) => props.onComplete(value)}>
                        <PinInputField {...styles.otpInputStyle} />
                        <PinInputField {...styles.otpInputStyle} />
                        <PinInputField {...styles.otpInputStyle} />
                        <PinInputField {...styles.otpInputStyle} />
                    </PinInput>
                </HStack>
            </Center>
        </>
    )
}
