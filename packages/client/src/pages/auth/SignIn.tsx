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
import { formSchema } from "@messenger/common";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: formSchema,
      onSubmit: (values, actions) => {
        const vals = { ...values };
        actions.resetForm();
        fetch("http://localhost:8080/auth/signin", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        })
          .then((res) => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then((data) => {
            if (!data) return;

            console.log(data);
          })
          .catch((err) => {
            console.error(err);
            return;
          });
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
      <Heading>Sign In</Heading>
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
          Sign In
        </Button>
        <Button onClick={() => navigate("/signup")}>Create Account</Button>
      </ButtonGroup>
    </VStack>
  );
}

export default SignIn;
