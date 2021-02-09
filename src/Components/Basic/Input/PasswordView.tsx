import passwordIcon from "@Assets/images/key.png";
import showIcon from "@Assets/images/eye.png";
import privateIcon from "@Assets/images/private.png";
import { useState } from "@hookstate/core";
import { Text, Center, Image, Input, Box } from "@chakra-ui/react";

interface IPasswordViewFCProps {
    title: string;
    name: string;
    register: (args: any) => any
}

export const PasswordViewFC = (props: IPasswordViewFCProps) => {
    const showPass = useState(false)

    return (
        <Box w="100%" margin="10px 0px">
            <Text color="#717171">{props.title}</Text>
            <Box display="flex" w="100%"
                margin="10px 0px">
                <Center w="15%">
                    <Image boxSize="35px" src={passwordIcon} />
                </Center>
                <Center w="70%">
                    <Input type={showPass.value ? "text" : "password"}
                        name={props.name}
                        ref={props.register({ required: true, minLength: 6 })}
                        border="none"
                        focusBorderColor="none" />
                </Center>
                <Center w="15%" onClick={() => showPass.set(!showPass.value)}>
                    <Image boxSize="35px" src={showPass.value ? privateIcon : showIcon} />
                </Center>
            </Box>
            <Box h="2px" borderRadius="full" w="100%" bg="#9C9C9C" />
        </Box>
    )
}