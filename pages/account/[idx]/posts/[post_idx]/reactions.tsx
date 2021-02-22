import { Box, Button, Center, Container, Image, Text } from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next";
import backIcon from "@Assets/images/back.png";
import lauchingIcon from "@Assets/images/laughing.png";
import heartIcon from "@Assets/images/heart.png";
import avatarDefaultIcon from "@Assets/images/monster_2.png";
import { useRouter } from "next/router";
import { useCallback, useState as useStateReact } from "react";
import { getAuthInfo } from "src/Commons/Auths/utils";
import { useQuery } from "@apollo/client";
import { GET_POST_DETAIL_QUERY } from "@Libs/Queries/getPostDetailQuery";
import { IUserReact } from "@Libs/Dtos/postDetail.interface";
import { GET_ACCOUNT_INFO_QUERY, IAccountInfo } from "@Libs/Queries/getAccountInfoQuery";


interface IReactionFCProps {
    iconSrc?: string;
    num_reacts: number;
    isSelected: boolean;
    onClick?: () => any;
}
const ReactionFC = (props: IReactionFCProps) => {
    return (
        <Button w="80px" h="62px"
            borderRadius="0px"
            padding="0px"
            onClick={() => props.onClick && props.onClick()}>
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

enum TypeReaction {
    ALL = 0,
    LOVE,
    HAHA
}

enum ReactStatusType {
    LOVE = "LOVE",
    HAHA = "HAHA"
}



interface IUserTabFC {
    accountId: string;
    reactStatus: ReactStatusType;
}

const UserTabFC = (props: IUserTabFC) => {
    const { authToken } = getAuthInfo();
    const { error, data, loading } = useQuery(GET_ACCOUNT_INFO_QUERY, {
        variables: {
            auth_token: authToken,
            account_id: props.accountId
        }
    });

    if (error) {
        return <div>Error when loading user.</div>
    }
    if (loading) {
        return null;
    }

    const accountInfo: IAccountInfo = data.accountProfile;

    return (
        <UserReactionFC avatar={accountInfo.avatarUrl || avatarDefaultIcon} reactIconSrc={props.reactStatus === ReactStatusType.LOVE ? heartIcon : lauchingIcon} name={`${accountInfo.firstName} ${accountInfo.lastName}`} />
    )
}

interface IUserTabReactionsFC {
    reactStatus: TypeReaction;
    data: Array<IUserReact>;
}
const UserTabReactionsFC = (props: IUserTabReactionsFC) => {
    let acceptedStatus: Array<string> = [];
    switch (props.reactStatus) {
        case TypeReaction.HAHA:
            acceptedStatus = ["HAHA"]
            break;
        case TypeReaction.LOVE:
            acceptedStatus = ["LOVE"]
            break
        default:
            acceptedStatus = ["LOVE", "HAHA"]
            break;
    }

    // handle data
    let accountDatas: Array<any> = [];

    props.data.filter(x => acceptedStatus.includes(x.type)).forEach((item, idx) => {
        item.accountIds.map(accountId => {
            return {
                accountId: accountId, reactStatus: item.type
            }
        }).forEach((_d, i) => {
            accountDatas.push(_d);
        });
    });

    return (
        <>
            {
                accountDatas.map((item, idx) => {
                    return (
                        <UserTabFC key={idx}  {...item} />
                    )
                })
            }
        </>
    )
}

const AccountPostReactions: NextPage<any, any> = (props: any) => {
    const router = useRouter();
    const [isSelected, setIsSelected] = useStateReact(TypeReaction.ALL);
    const { accountId, authToken } = getAuthInfo();
    const postId: string = router.query.post_idx as string || "";

    const { data, error, loading } = useQuery(GET_POST_DETAIL_QUERY, {
        variables: {
            account_id: accountId,
            auth_token: authToken,
            post_id: postId
        }
    });

    if (error) {
        return <div>Error when loading user reactions</div>
    }
    if (loading) {
        return null;
    }

    const userReacts: Array<IUserReact> = data.userPostDetail.userReacts;

    return (
        <PageContainer>
            <Container className="header"
                position="fixed"
                top="0px"
                display="flex">
                <Box boxSize="30px"
                    margin="10px 0px"
                    onClick={() => router.back()}>
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
                    <ReactionFC isSelected={isSelected === TypeReaction.ALL} num_reacts={20} onClick={() => setIsSelected(TypeReaction.ALL)} />
                    <ReactionFC isSelected={isSelected === TypeReaction.LOVE} num_reacts={10} iconSrc={heartIcon} onClick={() => setIsSelected(TypeReaction.LOVE)} />
                    <ReactionFC isSelected={isSelected === TypeReaction.HAHA} num_reacts={10} iconSrc={lauchingIcon} onClick={() => setIsSelected(TypeReaction.HAHA)} />
                </Box>
                <Container w="100%"
                    padding="0px">
                    <UserTabReactionsFC reactStatus={isSelected} data={userReacts || []} />
                </Container>
            </Container>
        </PageContainer>
    )
}

const Extended = withTranslation("common")(AccountPostReactions);

export default Extended;
