import React, { Component } from "react";
import DateRange from "../components/DateRange";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ButtonContainer } from "../components/styled/Button";
import TextField from "@material-ui/core/TextField";
import "./Schedule.css";
export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        { title: "Cup 2pc", start: "2020-07-03", end: "2020-07-03" },
        {
          title: "[PO]Snack 10pc",
          classNames: "calPO",
          start: "2020-07-07",
          end: "2020-07-07",
        },
        { title: "Pencil 5pc", start: "2020-07-15", end: "2020-07-15" },
        { title: "Eraser 10pc", start: "2020-07-15", end: "2020-07-15" },
        { title: "Clock 1pc", start: "2020-07-21", end: "2020-07-21" },
        { title: "Check Inventory", start: "2020-07-29", end: "2020-08-01" },
      ],
    };

    this.submit = this.submit.bind(this);
  }

  submit = () => {
    // const dateStr = prompt("Enter a date in YYYY-MM-DD format");
    // let date = new Date(dateStr + "T00:00:00"); // will be in local time

    // if (!isNaN(date.valueOf())) {

    // } else {
    //   alert("Invalid date.");
    // }
    // valid?
    let tempEvents = [...this.state.events];
    let startDate =
      document.getElementById("dateRange").innerText.split("-")[0] +
      "-" +
      document.getElementById("dateRange").innerText.split("-")[1] +
      "-" +
      document.getElementById("dateRange").innerText.split("-")[2];
    let endDate =
      document.getElementById("dateRange").innerText.split("-")[3] +
      "-" +
      document.getElementById("dateRange").innerText.split("-")[4] +
      "-" +
      document.getElementById("dateRange").innerText.split("-")[5];

    let tempObj = {
      title: document.getElementById("description").value,
      start: startDate,
      end: endDate,
    };
    tempEvents.push(tempObj);
    this.setState({
      events: tempEvents,
    });
  };

  render() {
    return (
      <div className="py-5 mx-auto">
        <div className="container">
          <div className="row">
            <div className="col-3 dateRange ">
              <div className="col-12 mt-3 mb-3 ">
                <h4 className="col-12 text-center">ADD Schedule</h4>
                <ButtonContainer id="addTodo" className="f1rem col-5">
                  To Do
                </ButtonContainer>
                <ButtonContainer id="addSchedule" po className="f1rem col-5 po">
                  Purchase Order
                </ButtonContainer>
              </div>
              <div className="col-12 mt-5 text-center">
                <DateRange className="text-center" />
              </div>
              <div className="col-12 text-center mt-5">
                <TextField
                  id="description"
                  label="Description"
                  multiline
                  rows={8}
                  variant="outlined"
                />{" "}
              </div>
              <div className="col-12 text-center mt-5">
                <ButtonContainer id="submit" da onClick={this.submit}>
                  Submit
                </ButtonContainer>
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-8" id="fullCalendar">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                events={this.state.events}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
