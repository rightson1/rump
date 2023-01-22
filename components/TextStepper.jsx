import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useGlobalProvider } from '../utils/themeContext';
import Grid from '@mui/material/Grid';
const steps = [
    {
        label: 'Depression',
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, provident!`,
    },
    {
        label: 'Stressed',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, provident!',
    },
    {
        label: 'Anxiety',
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis exercitationem consequuntur qui non sunt molestiae? Minus natus voluptas magnam eaque expedita reprehenderit, minima in, quae tenetur, excepturi doloremque obcaecati fugit?,Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis exercitationem consequuntur qui non sunt molestiae? Minus natus voluptas magnam eaque expedita reprehenderit, minima in, quae tenetur, excepturi doloremque obcaecati fugit?`,
    },
];


export default function TextStepper() {
    const { colors } = useGlobalProvider()
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Grid item xs={12} md={4} component={Paper}

            sx={{
                p: 2,
                backgroundColor: colors.primary[600],
                borderRadius: "1rem",
                height: "400px",
            }}

        >
            <Typography sx={{
                fontWeight: "bold",

            }}>Story-Text</Typography>
            <Box sx={{
                flexGrow: 1,
                maxHeight: {
                    xs: "100%",
                    md: "350px"
                }
            }}>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 50,
                        pl: 2,
                        bgcolor: colors.primary[600] + " !important",
                        maxHeight: {
                            xs: "100%",
                            md: "100px !important"
                        }
                    }}
                >
                    <Typography>{steps[activeStep].label}</Typography>
                </Paper>
                <Box sx={{
                    height: 255, width: '100%', p: 2,
                    overflow: 'auto'
                }}>
                    {steps[activeStep].description}
                </Box>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    sx={{
                        bgcolor: colors.teal[500]
                    }}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </Grid>

    );
}