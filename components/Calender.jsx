import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { formatDate } from "fullcalendar";
import Flex from "./Flex";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useGlobalProvider } from "../utils/themeContext";
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useEventsDelete, useEventsMutation, useEventsQuery } from "../utils/hooks/useEvents";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,

} from "@mui/material";
import { useAuth } from "../utils/authContext";
const Calender = () => {
    const [currentEvents, setCurrentEvents] = React.useState([])
    const { mutate, isSuccess: added, isError: failed } = useEventsMutation()
    const { mutate: deleteEvent, isSuccess, isError } = useEventsDelete()
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const { colors } = useGlobalProvider();
    const [events, setEvents] = useState([])

    const handleDateClick = (selected) => {
        const title = prompt("Enter Event Title");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();
        if (title) {
            calendarApi.addEvent({
                id: Date.now(),
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,


            })
        }
    }
    useEffect(() => {
        const id = user?.id
        if (!id) return;
        const q = query(collection(db, "events"), where("userId", "==", id));
        const unsubscribe = onSnapshot(q, snapshot => {

            setEvents(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        })
        return () => unsubscribe();
    }, [user?.id])

    const handleEventClick = (selected) => {
        if (window.confirm(`Are you sure you want to delete ${selected.event.title}`)) {
            selected.event.remove();
        }
    }

    const handleEvent = (event) => {
        const { id, title, startStr: start, endStr: end, allDay } = event.event;
        const data = { id, title, start, end, allDay, userId: user?.id }
        mutate(data)

    }

    const handleDelete = (event) => {
        const { id } = event.event;
        deleteEvent(id)

    }
    return <Flex sx={{
        mt: "4rem",
        flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
        },
        alignItems: {
            sm: "center",
            md: "start",
        },
        gap: {
            xs: '2rem',
            sm: "2rem",
            md: ".5rem",


        }

    }} >
        <Box
            component={Paper}
            sx={{

                backgroundColor: colors.primary[600] + "!important",
                height: '300px',
                width: '100%',
                overflow: 'auto',
                p: "1rem",
                flex: {
                    sm: undefined,
                    md: "1 1 30%",
                }

            }}  >
            <Typography>Events</Typography>
            <Typography color={{ color: colors.orange[500] }} className="italic text-[10px]">Long press date to add event</Typography>

            <List
            >
                {events?.length > 0 ?
                    events?.map((event) => (
                        <ListItem key={event.id} sx={
                            {
                                backgroundColor: colors.greenAccent[500],
                                margin: "10px 0",
                                borderRadius: "2px",
                            }
                        }>

                            <ListItemText primary={event.title}
                                secondary={
                                    <Typography>
                                        {formatDate(event.start,
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    )
                    ) :
                    loading ?

                        <>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                                    <Stack spacing={.5} key={index} mb="2rem">
                                        <Skeleton variant="rounded" width="100%" height={60} />
                                    </Stack>
                                ))
                            }
                        </> :
                        <Typography>No Events Added</Typography>
                }

            </List>
        </Box>
        <Box
            component={Paper}
            flex={
                {
                    sm: undefined,
                    md: "1 1 100%",
                }

            } ml="15px"
            sx={{
                bgcolor: colors.primary[600] + '!important',
                p: 2,
                width: '100%',
                '& .fc-license-message': {
                    display: 'none',
                },

                '& .fc-header-toolbar': {
                    display: 'flex !important',
                    gap: 1,
                    flexWrap: 'wrap',
                    justifyContent: "center",
                    mx: {
                        xs: '1rem !important',
                        md: '0 !important',
                    }
                },
                "& .fc-toolbar-chunk": {
                    display: 'flex !important',
                    justifyContent: "center !important",
                    width: '100%',


                },
                '& .fc-button-group': {
                    display: 'flex !important',
                    '& button': {
                        background: "transparent !important",
                        height: '25x !important',
                        width: '50px',
                        fontSize: '12px !important'
                    },

                },
                ".fc .fc-scrollgrid-section, .fc .fc-scrollgrid-section table, .fc .fc-scrollgrid-section>td": {
                    fontSize: '10px !important',
                },
                "& .fc-theme-standard .fc-scrollgrid ": {
                    border: `1px solid ${colors.grey[200]} !important`,
                },
                '& .fc-toolbar-title': {
                    fontSize: '13px !important',

                },
                '& .fc-event': {
                    fontSize: '13px !important',
                    bgcolor: `transparent !important`,
                    '&:hover': {
                        bgcolor: `${colors.primary[100]} !important`,
                    }

                },
                '& .fc-theme-standard .fc-list-day-cushion ': {
                    fontSize: '13px !important',
                    bgcolor: `${colors.primary[600]} !important`,
                    '&:hover': {
                        bgcolor: `${colors.primary[900]} !important`,
                    }


                },


            }}

        >
            <FullCalendar
                height="75vh"
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                ]}
                headerToolbar={{
                    left: "prev,next,today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                // eventsSet={(events) => setCurrentEvents(events)}
                eventAdd={handleEvent}
                eventChange={function () { }}
                eventRemove={handleDelete}
                longPressDelay={1}
                events={events}
            // initialEvents={[
            //     {
            //         id: "12315",
            //         title: "All-day event",
            //         date: "2022-09-14",
            //     },
            //     {
            //         id: "5123",
            //         title: "Timed event",
            //         date: "2022-09-28",
            //     },
            // ]}
            />

        </Box>
    </Flex>
};

export default Calender;
