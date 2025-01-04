import { Box, Flex, Divider, OrderedList, ListItem, Button, Text } from "@chakra-ui/react";
import { FaGoogleDrive } from "react-icons/fa6";

export default function IntroCopy() { 
  return (
    <Box maxW={{ base: "100%", md:"95%"}} mx='auto'>
      <Text fontWeight="semibold" fontSize='2xl' mt={8}>Welcome to SASE @ UMN's Talent Network resume database for 2024–2025! 🎉🎊</Text>

      <Flex direction={{ base: 'column', lg: 'row'}} mt={6} gap={{ base: '4', md: '4'}}>
        <Box flex="1">
        <Text fontWeight="semibold">Thank you for partnering with us!</Text>
          <Text>
            We are incredibly grateful for your vital support in nurturing the growth of our talented students.
            As a valued sponsor, you have exclusive access to our resume database, offering a glimpse into the skills and potential of our future leaders.
          </Text>
        </Box>

        <Divider orientation="vertical" display={{ base:"none", lg:"block" }} borderColor="gray.400" height="auto" size='xl'/>

        <Box flex="1">
          <Text fontWeight="semibold">Ways to view resumes</Text>
          <OrderedList stylePosition="outside">
            <ListItem>Click on 'View Resume' in the rightmost column to open a custom PDF viewer. Use 'Back' and 'Next' to move through resumes. Best viewed fullscreen via laptop.</ListItem>
            <ListItem>Visit our&nbsp;
            <Button
              as="a"
              href="https://drive.google.com/drive/folders/138QVOlQX-CrO_lbj8emAZ0QJ_lsRozVM?usp=sharing"
              target="_blank"
              variant="outline" 
              leftIcon={<FaGoogleDrive color="teal.500"/>} // Icon to the left
              size="sm" 
              color="teal.500"
              borderRadius="md" 
              borderWidth="1.4px"
              borderColor="gray.300"
              p={1} 
              height={6}
              display="inline-flex" 
              iconSpacing="5px"
            >
              Google Drive
            </Button>
              &nbsp;for quick access to all resumes.
            </ListItem>
          </OrderedList>   
        </Box>

        <Divider orientation="vertical" display={{ base: "none", lg: "block"}} borderColor="gray.400" height="auto"/>

        <Box flex="1">
          <Text fontWeight="semibold">College Name Acronyms</Text>
          <Text>🧬CBS – College of Biological Sciences</Text>
          <Text>🎨CDES – College of Design</Text>
          <Text>⚙️CSE – College of Science and Engineering</Text>
          <Text>💼CSOM – Carlson School of Management</Text>
        </Box>

      </Flex>
    </Box>
  );
}