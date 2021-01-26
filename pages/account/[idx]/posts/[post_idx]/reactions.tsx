import { Box, Button, Center, Container, Image, Text } from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next";
import backIcon from "@Assets/images/back.png";
import lauchingIcon from "@Assets/images/laughing.png";
import heartIcon from "@Assets/images/heart.png";
import avatarDefaultIcon from "@Assets/images/monster_2.png";
import { useRouter } from "next/router";
import { useCallback } from "react";


interface IReactionFCProps {
    iconSrc?: string;
    num_reacts: number;
    isSelected: boolean;
}
const ReactionFC = (props: IReactionFCProps) => {
    return (
        <Button w="80px" h="62px"
            borderRadius="0px"
            padding="0px">
            <Box boxSize="100%"
                position="relative"
            >
                <Center boxSize="100%">
                    <Box padding="3px">
                        {
                            props.iconSrc ? (
                                <Image boxSize="25px" src={props.iconSrc} />
                            ) : (
                                    <Text color="#8F00FF">All</Text>
                                )
                        }
                    </Box>
                    <Text color={props.isSelected ? "#6100FF" : "#9B9B9B"}>{props.num_reacts}</Text>
                </Center>

                <Box w="100%" h="3px" bg={props.isSelected ? "#8F00FF" : "transparent"}
                    position="absolute"
                    bottom="0px" />
            </Box >
        </Button >
    )
}

interface IUserReactionFCProps {
    avatar: string;
    name: string;
    reactIconSrc: string;
}

const UserReactionFC = (props: IUserReactionFCProps) => {
    return (
        <Container w="100%"
            display="flex"
            padding="10px 10px">
            <Box position="relative"
                boxSize="45px"
                marginRight="15px">
                <Box boxSize="45px"
                    borderRadius="full"
                    overflow="hidden">
                    <Image src={props.avatar} boxSize="100%" />
                </Box>
                <Box boxSize="12px"
                    borderRadius="full"
                    position="absolute"
                    bottom="0px"
                    right="0px"
                    border="solid #B2B2B2 1px"
                    overflow="hidden">
                    <Image src={props.reactIconSrc} boxSize="100%" />
                </Box>
            </Box>
            <Center>
                <Text
                    fontSize="25px">{props.name}</Text>
            </Center>
        </Container>
    )
}

const AccountPostReactions: NextPage<any, any> = (props: any) => {
    const router = useRouter();

    const handleOnClickBackButton = useCallback(
        () => {
            router.back()
        },
        [],
    )


    return (
        <PageContainer>
            <Container className="header"
                position="fixed"
                top="0px"
                display="flex">
                <Box boxSize="30px"
                    margin="10px 0px"
                    onClick={() => handleOnClickBackButton()}>
                    <Image boxSize="100%" src={backIcon} opacity="50%" />
                </Box>
                <Center w="100%">
                    <Text fontWeight="bold"
                        color="#0066FF"
                        fontSize="25px">Post Reactions</Text>
                </Center>
            </Container>
            <Container className="main"
                padding="0%"
                w="100%"
                marginTop="50px"
            >
                <Box w="100%"
                    bg="#F2F2F2"
                    display="flex">
                    <ReactionFC isSelected={true} num_reacts={20} />
                    <ReactionFC isSelected={false} num_reacts={10} iconSrc={heartIcon} />
                    <ReactionFC isSelected={false} num_reacts={10} iconSrc={lauchingIcon} />
                </Box>
                <Container w="100%"
                    padding="0px">
                    <UserReactionFC avatar={avatarDefaultIcon} reactIconSrc={heartIcon} name="Nguyen Minh Tuan" />
                    <UserReactionFC avatar={avatarDefaultIcon} reactIconSrc={lauchingIcon} name="Nguyen Minh Tuan" />
                    <UserReactionFC avatar={avatarDefaultIcon} reactIconSrc={lauchingIcon} name="Nguyen Minh Tuan" />
                    <UserReactionFC avatar={avatarDefaultIcon} reactIconSrc={heartIcon} name="Nguyen Minh Tuan" />
                </Container>
            </Container>
        </PageContainer>
    )
}

const Extended = withTranslation("common")(AccountPostReactions);

export default Extended;
