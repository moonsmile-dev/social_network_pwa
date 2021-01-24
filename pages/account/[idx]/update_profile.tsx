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
}

const FlexDataInput = (props: IFlexInput) => {
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
                <Input name={props.name} outline="none" border="none" focusBorderColor="none" fontSize="23px" w="85%" maxLength={20} ref={props.register} />
            </Box>
            <Box w="100%" h="2px" borderRadius="full" bg="#9C9C9C" marginTop="5px" />
        </Box>
    )
}


const options = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
    { value: 2, label: 'Unknown' },
];


interface IFlexDateSelectInput {
    name: string;
    title: string;
    type?: InputType;
    register?: any;
}
const FlexDateSelectInput = (props: IFlexDateSelectInput) => {

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
                    />
                ) : (
                        <Select
                            name={props.name}
                            ref={props.register}
                            options={options}
                            outline="none"
                            border="none"
                            focusBorderColor="none"
                        >
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                            <option value={2}>Unknown</option>
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
    const { register, handleSubmit, watch, errors, setValue } = useForm<Inputs>();

    const OnHandleUpdateAccountProfile = useCallback(
        async (d: any) => {
            console.log(d);
            await router.push(HOME_PAGE_ROUTE)
        },
        [],
    )


    return (
        <PageContainer>
            <Box className="header" w="100%" h="70px">
                <Center boxSize="100%">
                    <Text fontWeight="bold" fontSize="33px">Update Profile</Text>
                </Center>
            </Box>

            <Box w="100%">
                <form onSubmit={handleSubmit(OnHandleUpdateAccountProfile)}>
                    <FlexDataInput name="firstName" title="First Name" iconSrc={firstNameIcon} register={register} />
                    <FlexDataInput name="lastName" title="Last Name" iconSrc={lastNameIcon} register={register} />
                    <Box display="flex" w="100%">
                        <FlexDateSelectInput title="Birth Date" name="birthDate" register={register} type={InputType.DATE} />
                        <FlexDateSelectInput title="Gender" name="gender" register={register} type={InputType.SELECT} />
                    </Box>
                    <FlexDataInput name="bio" title="Bio" iconSrc={bioIcon} register={register} />
                    <FlexDataInput name="address" title="Address" iconSrc={addressIcon}
                        register={register} />
                    <FlexDataInput name="school" title="School" iconSrc={schoolIcon} register={register} />

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
