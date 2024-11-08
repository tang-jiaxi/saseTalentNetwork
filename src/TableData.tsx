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
      px={4}
      py={2}
      whiteSpace="nowrap" 
      overflow="hidden" 
      textOverflow="ellipsis"
      {...props}
    >
      {children}
    </Td>
  );
};

export default TableData;