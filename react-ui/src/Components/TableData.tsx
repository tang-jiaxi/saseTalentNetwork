import { Td } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TableDataProps {
  children: ReactNode;
  minWidth?: number;
  maxWidth?: number;
}

const TableData: React.FC<TableDataProps> = ({ children, ...props }) => {
  return (
    <Td 
      borderRight="1px" 
      borderRightColor="gray.200" 
      borderBottom="1px" 
      borderBottomColor="gray.200" 
      pl={4}
      pr={6}
      py={2}
      whiteSpace="nowrap" 
      overflow="hidden" 
      textOverflow="ellipsis"
      {...props}
      flexGrow={1}
      flexShrink={1}
      flexBasis="auto"
    >
      {children}
    </Td>
  );
};

export default TableData;