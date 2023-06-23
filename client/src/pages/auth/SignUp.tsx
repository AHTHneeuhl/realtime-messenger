import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function SignUp() {
  const navigate = useNavigate();

  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: Yup.object({
        username: Yup.string()
          .required("Username required!")
          .min(6, "Username too short!"),
        password: Yup.string()
          .required("Password required!")
          .min(6, "Password too short!"),
      }),
      onSubmit: (values, actions) => {
        alert(JSON.stringify(values, null, 2));
        actions.resetForm();
      },
    });

  return (
    <VStack
      as="form"
      w={{ base: "90%", md: "480px" }}
      h="100vh"
      m="auto"
      justify="center"
      spacing="4"
      onSubmit={() => handleSubmit()}
    >
      <Heading>Sign Up</Heading>
      <FormControl isInvalid={!!errors.username && !!touched.username}>
        <FormLabel fontSize="lg">Username</FormLabel>
        <Input
          type="text"
          name="username"
          placeholder="Enter username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormErrorMessage>{errors.username}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password && !!touched.password}>
        <FormLabel fontSize="lg">Password</FormLabel>
        <Input
          type="password"
          name="password"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
      <ButtonGroup pt="4">
        <Button colorScheme="teal" type="submit">
          Sign Up
        </Button>
        <Button
          onClick={() => navigate("/signin")}
          leftIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </ButtonGroup>
    </VStack>
  );
}

export default SignUp;
