import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useGlobalProvider } from '../utils/themeContext';

const UserTabs = () => {
    const { colors } = useGlobalProvider()
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    return <Box component={Paper}
        sx={{

            backgroundColor: colors.primary[600],
            borderRadius: "1rem",
            display: "flex",
            justifyContent: "center",
        }}

    >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
            TabIndicatorProps={{

            }}
            indicatorColor="red"
            sx={{
                '& .MuiButtonBase-root': {
                    color: colors.grey[100],

                },

            }}
        >
            <Tab label="User" {...a11yProps(0)} sx={{
                color: `${value === 0 && colors.teal[200]} !important`

            }} />
            <Tab label="Status" {...a11yProps(1)} sx={{
                color: `${value === 1 && colors.teal[200]} !important`
            }} />

        </Tabs>
    </Box>
};

export default UserTabs;
