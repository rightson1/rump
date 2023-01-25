import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useGlobalProvider } from '../utils/themeContext';
import { Grid } from '@mui/material';

const UserTabs = ({ value, setValue }) => {
    const { colors } = useGlobalProvider()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    return <Grid item xs={12} component={Paper}
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
            <Tab label="Status & Blogs" {...a11yProps(0)} sx={{
                color: `${value === 0 && colors.teal[200]} !important`

            }} />
            <Tab label="Tweets" {...a11yProps(1)} sx={{
                color: `${value === 1 && colors.teal[200]} !important`
            }} />

        </Tabs>
    </Grid>
};

export default UserTabs;
