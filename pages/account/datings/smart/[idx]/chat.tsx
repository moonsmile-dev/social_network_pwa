import { Box, Center, Flex, Grid, Image, Input, Text } from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next";
import React from "react";

import goOutIcon from "@Assets/images/out.png";
import flagIcon from "@Assets/images/flag.png";
import { ClapSpinner } from "react-spinners-kit";
import loveActionIcon from "@Assets/images/heart_action.png";

const styles = {
    boderTxt: {
        textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
    }
}

const AccountDatingMatchedSmartChat: NextPage<any, any> = () => {
    return (
        <PageContainer>
            <Box className="header" position="fixed" h="80px" w="100%" bg="#672AB6">
                <Center boxSize="100%">
                    <Grid templateColumns="repeat(3, 1fr)" gap={20}>
                        <Box boxSize="60px" >
                            <Image src={goOutIcon} />
                        </Box>
                        <Box boxSize="60px" >
                            <Center boxSize="100%">
                                <Flex>
                                    <ClapSpinner size="20" frontColor="white" />
                                    <Text marginLeft="10px" color="#D049FF" fontWeight="bold">10s</Text>
                                </Flex>
                            </Center>
                        </Box>
                        <Box boxSize="60px" padding="10px">
                            <Image src={flagIcon} />
                        </Box>
                    </Grid>
                </Center>
            </Box>
            <Box className="banner" position="fixed" top="95px" h="30px" w="100%" bg='#F03FFF'>
                <Center boxSize="100%">
                    <Text fontWeight="bold" fontSize="10px" color="white">180s life time, Let’s press heart to unlimited chatting</Text>
                </Center>
            </Box>
            <Box className="input_area"
                position="fixed"
                bottom="20px"
                left="20px"
                right="10px"
                h="45px"
                borderRadius="5px"
                bg="#EDD0FF"
                border="solid white 1px">
                <Flex boxSize="100%">
                    <Input h="100%" w="80%" border="none" outline="none" placeholder="Input your mind here" color="white" />
                    <Center boxSize="100%">
                        <Text fontWeight="bold" color="#0085FF" {...styles.boderTxt}>SEND</Text>
                    </Center>
                </Flex>
            </Box>
            <Box className="love_action" position="fixed"
                boxSize="65px" bg="#F03FFF" top="50%" right="10px"
                borderRadius="full"
                border="solid white 1px"
                padding="10px">
                <Image src={loveActionIcon} />

            </Box>
            <Box boxSize="100%" paddingTop="100px" height="1000px" bg="#7F43FF">
            </Box>
        </PageContainer>
    )
}

const Extended = withTranslation("common")(AccountDatingMatchedSmartChat);

export default Extended;

