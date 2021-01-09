import {
    Box,
    Center,
    Container,
    Flex,
    Grid,
    GridItem,
    Image,
    Text,
} from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next";
import React from "react";

import backIcon from "@Assets/images/back_white.png";
import coverImg from "@Assets/images/abc.png";
import ageIcon from "@Assets/images/adult.png";
import genderIcon from "@Assets/images/gender.png";
import supportIcon from "@Assets/images/support.png";
import workIcon from "@Assets/images/work.png";
import locationIcon from "@Assets/images/pin.png";
import closeDatingIcon from "@Assets/images/dating_close.png";
import heartDatingIcon from "@Assets/images/heart-dating.png";
import Gallery from "react-photo-gallery";

const PHOTOS = [
    {
        src: "https://s3-ap-southeast-1.amazonaws.com/odv-stag/tenants/cd99c164-11b0-4ce2-ada4-4b8c6dd2d4ad/photos/xejm9edreuxuuokne_0b8aba5c.jpeg",
        width: 4,
        height: 2,
    },
    {
        src: "https://s3-ap-southeast-1.amazonaws.com/odv-stag/tenants/cd99c164-11b0-4ce2-ada4-4b8c6dd2d4ad/photos/ccg1walpzr5lq4mbq_fce894ad.jpeg",
        width: 4,
        height: 1,
    },
    {
        src: "https://s3-ap-southeast-1.amazonaws.com/odv-stag/tenants/cd99c164-11b0-4ce2-ada4-4b8c6dd2d4ad/photos/cm9owltqkl0xbcods_ed868f53.jpeg",
        width: 2,
        height: 2,
    },
    {
        src: "https://s3-ap-southeast-1.amazonaws.com/odv-stag/tenants/cd99c164-11b0-4ce2-ada4-4b8c6dd2d4ad/photos/4pjjidpb5ugjmjrim_eed38f0d.jpeg",
        width: 2,
        height: 4,
    },
    {
        src: "https://s3-ap-southeast-1.amazonaws.com/odv-stag/tenants/cd99c164-11b0-4ce2-ada4-4b8c6dd2d4ad/photos/xejm9edreuxuuokne_0b8aba5c.jpeg",
        width: 4,
        height: 2,
    },
    {
        src: "https://s3-ap-southeast-1.amazonaws.com/odv-stag/tenants/cd99c164-11b0-4ce2-ada4-4b8c6dd2d4ad/photos/ccg1walpzr5lq4mbq_fce894ad.jpeg",
        width: 4,
        height: 1,
    },
    {
        src: "https://s3-ap-southeast-1.amazonaws.com/odv-stag/tenants/cd99c164-11b0-4ce2-ada4-4b8c6dd2d4ad/photos/cm9owltqkl0xbcods_ed868f53.jpeg",
        width: 2,
        height: 2,
    },
    {
        src: "https://s3-ap-southeast-1.amazonaws.com/odv-stag/tenants/cd99c164-11b0-4ce2-ada4-4b8c6dd2d4ad/photos/4pjjidpb5ugjmjrim_eed38f0d.jpeg",
        width: 2,
        height: 4,
    },
];

interface IInfoFieldProp {
    icon: string;
    headertxt: string;
    detail: string;
}
const InfoField = (props: IInfoFieldProp) => {
    return (
        <Container padding="4px 0px">
            <Flex>
                <Box boxSize="25px" marginRight="15px">
                    <Image src={props.icon} />
                </Box>
                <Text fontWeight="bold" color="#9F9F9F" marginRight="10px">{props.headertxt}:</Text>
                <Text fontWeight="bold">{props.detail}</Text>
            </Flex>
        </Container>
    )
}

const AccountDatingRecsPartnerDetail: NextPage<any, any> = () => {
    return (
        <PageContainer>
            <Box
                className="back_button"
                boxSize="25px"
                position="fixed"
                top="10px"
                left="10px"
            >
                <Image src={backIcon} />
            </Box>
            <Container position="fixed" bottom="10px" zIndex="0">
                <Center>
                    <Box
                        className="close_action"
                        boxSize="70px"
                        bg="white"
                        borderRadius="100%"
                        overflow="hidden"
                        padding="10px"
                        margin="0px 20px"
                        boxShadow="2px 2px #F5F5F5"
                    >
                        <Image src={closeDatingIcon} />
                    </Box>
                    <Box
                        className="heart_action"
                        boxSize="70px"
                        bg="white"
                        borderRadius="100%"
                        overflow="hidden"
                        padding="10px"
                        margin="0px 20px"
                        boxShadow="2px 2px #F5F5F5"
                    >
                        <Image src={heartDatingIcon} />
                    </Box>
                </Center>

            </Container>

            <Container padding="0px">
                <Image src={coverImg} fit="cover" maxH="300px" w="100%" />
            </Container>
            <Container w="100%" bg="white">
                <Center>
                    <Box maxW="400px">
                        <Box
                            bg="#F9F7F7"
                            marginTop="-230px"
                            borderRadius="15px 15px 0px 0px"
                            paddingBottom="20px"
                        >
                            <Container className="main-info" padding="30px">
                                <Center >
                                    <Text fontWeight="bold" fontSize="30px">
                                        ABC II SH.HAI
                                    </Text>
                                </Center>
                                <Center>
                                    <Flex>
                                        <Box
                                            margin="0px 5px"
                                            bg="#00C738"
                                            boxSize="10px"
                                            borderRadius="100%"
                                            border="solid white 1px"
                                        />
                                        <Text opacity="70%" lineHeight="10px">recently active</Text>
                                    </Flex>
                                </Center>

                            </Container>
                            <Container className="detail-info" padding="0px 20px">
                                <InfoField icon={ageIcon} headertxt="Age" detail="22" />
                                <InfoField icon={genderIcon} headertxt="Gender" detail="Girl" />
                                <InfoField
                                    icon={locationIcon}
                                    headertxt="Live in"
                                    detail="Ho Chi Minh 20"
                                />
                                <InfoField icon={workIcon} headertxt="Work" detail="Student" />
                                <InfoField
                                    icon={supportIcon}
                                    headertxt="Why here"
                                    detail="Find lost pet"
                                />
                            </Container>
                        </Box>
                        <Box
                            marginTop="10px"
                            bg="#F9F7F7"
                            padding="25px 10px 10px 10px"
                            overflow="hidden"
                        >
                            <Text fontWeight="bold" fontSize="25px">Photos</Text>
                            <Gallery photos={PHOTOS} />
                        </Box>
                    </Box>
                </Center>
            </Container>
        </PageContainer>
    );
};

const Extended = withTranslation("common")(AccountDatingRecsPartnerDetail);

export default Extended;
