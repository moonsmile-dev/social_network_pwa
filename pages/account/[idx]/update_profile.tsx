import { Box, Button, Center, Container, Image, Input, Select, Text } from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next"

import firstNameIcon from "@Assets/images/username_icon.png";
import lastNameIcon from "@Assets/images/name.png";
import bioIcon from "@Assets/images/bio.png";
import addressIcon from "@Assets/images/address.png";
import schoolIcon from "@Assets/images/graduation-hat.png";
import { useForm } from "react-hook-form";
import React from "react";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { HOME_PAGE_ROUTE } from "src/Routes/contants";
import { getAuthInfo } from "src/Commons/Auths/utils";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_ACCOUNT_PROFILE_MUTATION } from "@Libs/Mutations/updateAccountProfileMutation";
import { useEffect } from "react";
import { GET_ACCOUNT_PROFILE_QUERY } from "@Libs/Queries/getAccountProfileQuery";
import { IAccountProfile } from "@Libs/Dtos/accountProfile.interface";
import { useState } from "@hookstate/core";


enum InputType {
    DATE = "date",
    SELECT = "select"
}

interface IFlexInput {
    name: string;
    title: string;
    type?: InputType;
    iconSrc?: string;
    register?: any;
    init_value?: string;
}

const FlexDataInput = (props: IFlexInput) => {
    const inputValue = useState(props.init_value);
    return (
        <Box margin="10px 0px" padding="0px 15px">
            <Box padding="5px 0px" >
                <Text fontSize="15px" color="#717171">{props.title}</Text>
            </Box>
            <Box w="100%" display="flex">
                {
                    props.iconSrc && (
                        <Center padding="0px 5px" margin="0px">
                            <Image src={props.iconSrc || ""} boxSize="35px" />
                        </Center>
                    )
                }
                <Input name={props.name} outline="none" border="none" focusBorderColor="none" fontSize="23px" w="85%" maxLength={20} ref={props.register} value={inputValue.value} onChange={(event) => inputValue.set(event.target.value)} />
            </Box>
            <Box w="100%" h="2px" borderRadius="full" bg="#9C9C9C" marginTop="5px" />
        </Box>
    )
}

const convertDateStringToDateInput = (val: string) => {
    try {
        const local = new Date(val);

        local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    } catch {
        return val
    }
}


interface IFlexDateSelectInput {
    name: string;
    title: string;
    type?: InputType;
    register?: any;
    init_value?: any;
}
const FlexDateSelectInput = (props: IFlexDateSelectInput) => {
    const inputValue = useState(convertDateStringToDateInput(props.init_value || ""));

    return (
        <Container margin="10px 0px">
            <Container padding="5px 0px" >
                <Text fontSize="15px" color="#717171">{props.title}</Text>
            </Container>
            {
                props.type == InputType.DATE ? (
                    <Input name={props.name} type={props.type || "date"}
                        outline="none" border="none" focusBorderColor="none"
                        ref={props.register}
                        value={inputValue.value}
                        onChange={(event) => inputValue.set(event.target.value)}
                    />
                ) : (
                        <Select
                            name={props.name}
                            ref={props.register}
                            outline="none"
                            border="none"
                            focusBorderColor="none"
                            defaultValue={inputValue.value}
                        >

                            <option value={"MALE"}>Male</option>
                            <option value={"FEMALE"}>Female</option>
                            <option value={"UN_KNOWN"}>Unknown</option>
                        </Select>
                    )
            }
            <Box w="100%" h="2px" borderRadius="full" bg="#9C9C9C" marginTop="5px" />
        </Container>
    )
}

type Inputs = {
    firstName: string,
    lastName: string,
    bio: string,
    address: string,
    school: string
    gender: number,
    birthDate: Date
}

const AccountIdxUpdateProfile: NextPage<any, any> = (props: any) => {
    const router = useRouter();
    const nextRoute: string = router.query.next as string;
    const { register, handleSubmit, watch, errors, setValue } = useForm<Inputs>();
    const { accountId, authToken } = getAuthInfo();
    const [updateProfileAction] = useMutation(UPDATE_ACCOUNT_PROFILE_MUTATION);

    const OnHandleUpdateAccountProfile = useCallback(
        async (d: any) => {
            console.log(d);

            await updateProfileAction({
                variables: {
                    account_id: accountId,
                    auth_token: authToken,

                    address: d["address"],
                    avatar_url: "",
                    bio: d["bio"],
                    birth_date: d["birthDate"],
                    cover_url: "",
                    email: "",
                    first_name: d["firstName"],
                    gender: d["gender"],
                    last_name: d["lastName"],
                    marital_status: "",
                    phone_number: "",
                    school: d["school"]
                }
            })

            if (nextRoute) {
                await router.push(nextRoute);
            }
        },
        [],
    )

    const { data, error, loading } = useQuery(GET_ACCOUNT_PROFILE_QUERY, {
        variables: {
            account_id: accountId,
            auth_token: authToken
        }
    })

    if (error) {
        return <div>Error when get account profile</div>
    }

    if (loading) {
        return null;
    }

    console.log(data)
    const accountProfile: IAccountProfile = data.accountProfile;

    return (
        <PageContainer>
            <Box className="header" w="100%" h="70px">
                <Center boxSize="100%">
                    <Text fontWeight="bold" fontSize="33px">Update Profile</Text>
                </Center>
            </Box>

            <Box w="100%">
                <form onSubmit={handleSubmit(OnHandleUpdateAccountProfile)}>
                    <FlexDataInput name="firstName" title="First Name" iconSrc={firstNameIcon} register={register} init_value={accountProfile.firstName || ""} />
                    <FlexDataInput name="lastName" title="Last Name" iconSrc={lastNameIcon} register={register} init_value={accountProfile.lastName || ""} />
                    <Box display="flex" w="100%">
                        <FlexDateSelectInput title="Birth Date" name="birthDate" register={register} type={InputType.DATE} init_value={accountProfile.birthDate} />
                        <FlexDateSelectInput title="Gender" name="gender" register={register} type={InputType.SELECT} init_value={accountProfile.gender} />
                    </Box>
                    <FlexDataInput name="bio" title="Bio" iconSrc={bioIcon} register={register} init_value={accountProfile.bio || ""} />
                    <FlexDataInput name="address" title="Address" iconSrc={addressIcon}
                        register={register} init_value={accountProfile.address || ""} />
                    <FlexDataInput name="school" title="School" iconSrc={schoolIcon} register={register} init_value={accountProfile.school || ""} />

                    <Center w="100%" padding="50px 0px">
                        <Button
                            type="submit"
                            w="50%"
                            borderRadius="full"
                            fontWeight="bold"
                            color="white"
                            bg="#8542F2"
                            border="solid #B280D0 1px">
                            Update
                        </Button>
                    </Center>
                </form>

            </Box>
        </PageContainer >
    )
}


const Extended = withTranslation("common")(AccountIdxUpdateProfile);

export default Extended;
