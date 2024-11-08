import { useState, useEffect } from 'react'
import {
  Button,
  Flex,
  Table,
  Tbody,
  Box,
  Thead,
  Th,
  Tr,
  ChakraProvider,
  useBreakpointValue,
  ResponsiveValue,
} from '@chakra-ui/react'
import { Resume, resumes } from './resume'
import TableHeader from './TableHeader'
import TableData from './TableData'
import Nav from './Nav'
import IntroCopy from './IntroCopy'
import Footer from './Footer'
import theme from './theme'

function App() {
  const [selectedResume, setSelectedResume] = useState(resumes[0].link);
  const [isPDFViewVisible, setIsPDFViewVisible] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [years, setYears] = useState<string[]>([]);
  const [majors, setMajors] = useState<string[]>([]);
  const [colleges, setColleges] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof Resume | null>(null);
  const [sortOrder, setSortOrder] = useState('');
  const direction = useBreakpointValue<ResponsiveValue<"row" | "column">>({ base: 'column', md: 'row' });
  const viewerWidth = useBreakpointValue({ base: '100%', md: '45%' });

  interface Column<T> {
    key: keyof T;           
    title: string;           
    filterable: boolean;   
    options?: string[];   
  }

  const columns: Column<Resume>[] = [
    { key: 'name', title: 'Name', filterable: false },
    { key: 'email', title: 'Email', filterable: false },
    { key: 'year', title: 'Year', filterable: true, options: years },
    { key: 'major', title: 'Major', filterable: true, options: majors },
    { key: 'college', title: 'College', filterable: true, options: colleges },
  ];

  const [filters, setFilters] = useState<{
    [key in keyof Resume]?: string[];
  }>({});

  useEffect(() => {
    const allYears = [...new Set(resumes.map((resume) => resume.year))];
    const allMajors = [...new Set(resumes.flatMap((resume) => resume.major))];
    const allColleges = [...new Set(resumes.flatMap((resume) => resume.college))];
    
    setYears(allYears);
    setMajors(allMajors);
    setColleges(allColleges);
  }, []);

  const handleSort = (column: keyof Resume, value: string) => {
    setSortColumn(column);
    setSortOrder(value);
  };

  const handleClick = (resumeLink : string, index : number) => {
    setIsPDFViewVisible(true); 
    setSelectedResume(resumeLink);
    setSelectedRowIndex(index); 
  };

  const handleClose = () => {
    setIsPDFViewVisible(!isPDFViewVisible); 
    setSelectedResume("");
    setSelectedRowIndex(-1);
  };

  const handleNextResume = () => {
    if (selectedRowIndex < filteredResumes.length - 1) {
      const nextIndex = selectedRowIndex + 1;
      setSelectedResume(filteredResumes[nextIndex].link);
      setSelectedRowIndex(nextIndex);
    } else {
      setSelectedResume(filteredResumes[0].link);
      setSelectedRowIndex(0);
    }
  };

  const handlePrevResume = () => {
    if (selectedRowIndex > 0) {
      const prevIndex = selectedRowIndex - 1;
      setSelectedResume(filteredResumes[prevIndex].link);
      setSelectedRowIndex(prevIndex);
    } else {
      const lastIndex = filteredResumes.length - 1;
      setSelectedResume(filteredResumes[lastIndex].link);
      setSelectedRowIndex(lastIndex);
    }
  };

  const handleOptionChange = (columnKey: keyof Resume, value : string | string[]) => {
    setFilters((prevFilters) => {
      const selectedValues = Array.isArray(value) ? value : [value];
      const allOptions = columns.find(column => column.key === columnKey)?.options || [];

      if (selectedValues.length === allOptions.length) {
        return {
          ...prevFilters,
          [columnKey]: [],
        };
      } else {
        return {
          ...prevFilters,
          [columnKey]: selectedValues,
        };
      }
    });
  };

  const filteredResumes = resumes.filter((resume) => {
    return Object.entries(filters).every(([key, filterValues]) => {
      if (!filterValues?.length) return true;
      
      const resumeValue = resume[key as keyof Resume];
      if (Array.isArray(resumeValue)) {
        // If the value is an array, check if any of the values match the filter
        return filterValues.some(value => resumeValue.includes(value));
      }
  
      return filterValues.includes(resumeValue as string);
    });
  });

  const sortedResumes = filteredResumes.sort((a, b) => {
      if (!sortColumn) return 0;

      let comparison = 0;

      const yearOrder: Record<string, number> = {
        Freshman: 1,
        Sophomore: 2,
        Junior: 3,
        Senior: 4,
        Graduate: 5,
      };

      if (sortColumn === 'year') {
        const yearA = yearOrder[a.year] || 0;
        const yearB = yearOrder[b.year] || 0;
        comparison = yearA - yearB;
      } else {
        const stringA = Array.isArray(a[sortColumn])
        ? (a[sortColumn] as string[]).sort()[0].toString() // Assert that it's a string array before sorting
        : a[sortColumn].toString();
        const stringB = Array.isArray(b[sortColumn])
            ? (b[sortColumn] as string[]).sort()[0].toString() // Assert that it's a string array before sorting
            : b[sortColumn].toString();
        comparison = stringA > stringB ? 1 : stringA < stringB ? -1 : 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  const handleResetClick = () => {
    setFilters({});
    setSortColumn(null);
    setSortOrder('');
  };

  useEffect(() => {
    if (isPDFViewVisible && selectedRowIndex >= 0 && selectedRowIndex < sortedResumes.length) {
      const resumeLink = sortedResumes[selectedRowIndex]?.link;
      if (resumeLink) {
        setSelectedResume(resumeLink);
      }
    }
  }, [sortedResumes, isPDFViewVisible, selectedRowIndex]);

  const scrollbarStyle = {
    '&::-webkit-scrollbar': {
      height: '8px',
      width: '9px',
      borderRadius: '8px',
      backgroundColor: `rgba(0, 0, 0, 0.05)`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `rgba(0, 0, 0, 0.06)`,
      borderRadius: '8px',
    },
  };  

  return (
    <Flex alignItems="flex-start" gap={2} height="100vh">
      {/* Website Content */}
      <Box 
        flex="1"
        width={isPDFViewVisible ? "1" : "1 1 100%"} 
        overflowY="auto"
        height="100%"
        sx={scrollbarStyle}
      >
        <Box mx={4} overflow='hidden'>
          <Nav direction={direction}></Nav>
          <IntroCopy></IntroCopy>

          <Button 
            display='block'
            onClick={handleResetClick} 
            background="#425075" 
            color="white" 
            size="xs"
            ml="auto"
            mb={3}
          >
            Reset All
          </Button>

        </Box>

        {/* Table */}
        <Box 
          position="relative" 
          height="auto"
          marginTop={{ base: 8, md: 0 }} 
          overflowX="auto" 
          sx={scrollbarStyle}
        >

          <Table height="auto">
            <Thead bgColor="#B8D0E9">
              <Tr height="auto">
                {columns.map((column) => (
                  <TableHeader
                    key={column.key}
                    columnKey={column.key}
                    title={column.title}
                    options={column.options || []}
                    filterable={column.filterable}
                    filters={filters}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                    handleOptionChange = {handleOptionChange}
                    sortedColumn={sortColumn}
                  />
                ))}
                <Th borderRight="1px" borderRightColor="gray.200" px={4} py={2}> 
                  Resume 
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedResumes.map((resume, index ) => (
                <Tr 
                  key={index} 
                  bg={selectedRowIndex === index ? "#EEF5FC" : "white"}
                  width="100%"
                >
                  <TableData>{resume.name}</TableData>
                  <TableData>{resume.email}</TableData>
                  <TableData>{resume.year}</TableData>
                  <TableData>{resume.major.sort().join(', ')}</TableData>
                  <TableData>{resume.college.sort().join(', ')}</TableData>
                  <TableData>
                    <Button
                      as="a"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleClick(resume.link, index);
                      }}
                      variant="link"
                      colorScheme='teal' 
                      size='sm'
                      maxWidth={300}
                    >
                      View Resume
                    </Button>
                  </TableData>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Footer></Footer>  

      </Box>

      {/* PDF Viewer */}
      {isPDFViewVisible ?
        <Flex direction="column" height="100vh" width={viewerWidth}>
          <Box flex="1" marginRight={4} marginTop={4} width="100%">
            <iframe
              src={selectedResume}
              title="Resume Viewer"
              style={{ border: 'none', width: '100%', height: '100%' }}
            ></iframe>
          </Box>
          <Flex justifyContent="space-between" margin={4} gap={8}>
            <Flex>
              <Button onClick={handlePrevResume} background="#425075" color="white" marginRight={4}>
                Back
              </Button>
              <Button onClick={handleNextResume} background="#425075" color="white">
                Next
              </Button>
            </Flex>
            <Button onClick={handleClose} background="#425075" color="white">
              Close Viewer
            </Button>
          </Flex>
        </Flex>
      : null }
    </Flex>
  );
}

export default function WrappedApp() {
  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );
}
