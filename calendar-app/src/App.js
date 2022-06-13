

import React, {useState,useEffect} from "react";
import "./App.css";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import "@fullcalendar/daygrid/main.css";


function App() {
  const [allEvents, setAllEvents] = useState([]);


  const fetchData = () => {
      // fetch data from the specific API
      fetch("https://date.nager.at/api/v3/publicholidays/2022/HR")
          .then(response => {
              return response.json()
          })
          // get the data from the json returned
          .then(data => {
              if (data) {
                // maping the the specific events' information
                setAllEvents(data.map((event) => {
                      return {
                          title: event.localName,
                          start: new Date(event.date),
                          end: new Date(event.date),
                          allDay: false
                      }
                  }));
              }
          });
  }
  // fetch data from API an show them after the view rendering
  useEffect(() => {
      fetchData()
  }, [])

  return ( 
    <div className = "App" >
      <h1> Welcome to Calendar App </h1>
      <FullCalendar plugins = {
          [dayGridPlugin]
      }
      initialView = "dayGridMonth"
      eventClick = {
          function(arg) {
              alert(arg.event.title + "\n" + arg.event.start)
          }
      }
      events = {allEvents}
      startAccessor = "start"
      endAccessor = "end"
      className = "calendar-design"/>
      </div>
  );
}

export default App;