import React, { ReactNode } from 'react'
import { Th, Flex, Box, Menu, MenuButton, Button, MenuList, Portal, MenuOptionGroup, MenuItemOption } from '@chakra-ui/react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { BiFilterAlt } from 'react-icons/bi'
import { TbSortAscending2, TbSortDescending2 } from "react-icons/tb";
import { Resume } from '../resume'
import '../index.css'

interface TableHeaderProps {
  title: string;
  options: string[];
  selectedOptions?: string[];
  setSelectedOptions?: React.Dispatch<React.SetStateAction<string[]>>;
  children?: ReactNode;
  columnKey: keyof Resume;
  filterable: boolean;
  filters: { [key in keyof Resume]?: string[] };
  sortOrder: string;
  sortedColumn: keyof Resume | null;
  handleSort: (column: keyof Resume, value: string) => void;
  handleOptionChange: (columnKey: keyof Resume, value: string | string[]) => void;
}
  
const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  options,
  selectedOptions,
  setSelectedOptions,
  columnKey,
  filterable,
  filters,
  sortOrder,
  sortedColumn,
  handleSort,
  handleOptionChange,
  ...props
}) => {

  const isFilterApplied = filters[columnKey] ? filters[columnKey]!.length > 0 : false;
  const isSorted = sortedColumn === columnKey;

  return (
    <Th 
      borderRight="1px" 
      borderRightColor="gray.200" 
      px={4} 
      py={0}
      position="relative"
      {...props}
    >
      <Flex align="center" width="full">
        <Box>
          <Menu closeOnSelect={false} placement='bottom-start'>
            <MenuButton 
              as={Button} 
              rightIcon={<IoMdArrowDropdown style={{color:"#4A5568"}}/>} 
              variant="ghost" 
              padding={0}
              width="100%"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                _hover: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
                _active: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
                _focus: {
                  boxShadow: "none",
                },
              }}
            >
              <Flex as="span" textAlign="left" flex="1">
                <Th borderBottom={0} padding={0}>{title}</Th>
                {isSorted && sortOrder === 'asc' && <TbSortAscending2 style={{ marginLeft: '4px', color: '#4A5568' }} size={17}/>}
                {isSorted && sortOrder === 'desc' && <TbSortDescending2 style={{ marginLeft: '4px', color: '#4A5568' }} size={17}/>}
                {isFilterApplied && <BiFilterAlt style={{ marginLeft: '4px', color: '#4A5568' }} size={16}/>}
              </Flex>
            </MenuButton>
            <Portal>
              <MenuList 
                overflow="visible" 
                maxHeight={400} 
                overflowY="auto"
                marginBottom={4}
                className="custom-scrollbar"
              >
                <MenuOptionGroup 
                    type='radio' 
                    value={sortOrder}
                    onChange={(value) => handleSort(columnKey, value as string)}
                    title="Sort"
                >
                  <MenuItemOption value="asc">
                    Ascending
                  </MenuItemOption>
                  <MenuItemOption value="desc">
                    Descending
                  </MenuItemOption>
                </MenuOptionGroup>
              {filterable ? ( 
                <MenuOptionGroup 
                  type='checkbox' 
                  value={filters[columnKey] || []}
                  onChange={(value) => handleOptionChange(columnKey, value)}
                  title="Filter"
                  fontSize="sm"
                >
                  {options.sort().map((option) => (
                    <MenuItemOption
                      key={option}
                      value={option}
                      >
                      {option}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              ) : null}
              </MenuList>
            </Portal>
          </Menu>
        </Box>
      </Flex>
    </Th>
  );
};

export default TableHeader;