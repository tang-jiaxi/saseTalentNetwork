import { Box, Link, Image, Text, ResponsiveValue } from "@chakra-ui/react";

interface NavProps {
  direction: ResponsiveValue<"row" | "column"> | undefined;
}
  

const Nav: React.FC<NavProps> = ({ direction }) => 
{
  return ( 
    <Box display="flex" alignItems="center" marginX={4} marginTop={3} flexDirection={direction} >
      <Image
        src={`${process.env.PUBLIC_URL}/saselogoname.png`}
        alt="SASE Logo"
        width={60}
        marginRight={4}
        marginBottom={{ base: 3, md: 0 }}
      />
      <Box display="flex" alignItems="center" marginLeft={{base: 0, md: "auto"}}>
        <Link href="https://saseumn.org/" isExternal marginX={2}>
          <Text color="#1F2638" fontWeight="semibold">
            Website
          </Text>
        </Link>
        <Link href="https://www.instagram.com/saseumn/" isExternal marginX={2}>
          <Text color="#1F2638" fontWeight="semibold">
            Instagram
          </Text>
        </Link>
        <Link href="https://www.facebook.com/SASE/" isExternal marginX={2}>
          <Text color="#1F2638" fontWeight="semibold">
            Facebook
          </Text>
        </Link>
        <Link href="mailto:sasemail@umn.edu" isExternal marginX={2}>
          <Text color="#1F2638" fontWeight="semibold">
            Email
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default Nav;