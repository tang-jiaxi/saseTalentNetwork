import { Box, Link, Text } from "@chakra-ui/react";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

export default function Footer() { 
  return (
    <Box marginTop={5} marginBottom={6} textAlign="center" display="flex" alignItems="center" justifyContent="center">
      <Text margin={4} fontSize={13}> Designed and coded by Jiaxi Tang — SASE @ UMN Corporate Director 2024–2025 
      <br/> with the use of React, Javascript, Typescript, and ChakraUI.</Text>
      <Link href="https://drive.google.com/file/d/1dD2n2aYtkoNIyYMyzl0TgoMIKYORmfq9/view?usp=drive_link" isExternal>
        <BsFillFileEarmarkPersonFill size={25} color="#6e7d8c" />
      </Link>
      <Link href="mailto:tang0773@umn.edu" isExternal marginLeft={1}>
        <IoMail size={28} color="#6e7d8c" />
      </Link>
      <Link href="https://www.linkedin.com/in/jiaxi--tang/" isExternal marginLeft={1}>
        <FaLinkedin size={25} color="#6e7d8c" />
      </Link>
    </Box>
  );
}