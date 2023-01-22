import React, { useEffect } from "react";
import Calender from "../components/Calender";
import {
    Box,

} from "@mui/material";

const Events = () => {


    return <Box
        m="1rem"
    >
        <Calender />
    </Box>;
};
Events.getLayout = (page) => {
    return <>
        {page}
    </>
}
Events.admin = true
Events.head = ""

Events.user = true
export default Events;
