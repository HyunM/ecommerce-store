import React, { Component } from "react";
import DateRange from "../components/DateRange";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ButtonContainer } from "../components/styled/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./Schedule.css";
import DeleteScheduleModal from "../components/DeleteScheduleModal";
import NotificationButton from "../components/styled/NotificationButton";

export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [
        { title: "Cup 2pc", start: "2020-07-03", end: "2020-07-03", id: "1" },
        {
          title: "[PO]Snack 10pc",
          classNames: "calPO",
          start: "2020-07-07",
          end: "2020-07-07",
          id: "2",
        },
        {
          title: "Pencil 5pc",
          start: "2020-07-15",
          end: "2020-07-15",
          id: "3",
        },
        {
          title: "Eraser 10pc",
          start: "2020-07-15",
          end: "2020-07-15",
          id: "4",
        },
        {
          title: "Clock 1pc",
          start: "2020-07-21",
          end: "2020-07-21",
          id: "15",
        },
        {
          title: "Check Inventory",
          start: "2020-07-29",
          end: "2020-08-01",
          id: "6",
        },
      ],
      clickStatus: "",
      deleteScheduleModalOpen: false,
      deleteScheduleModalTitle: "",
      deleteScheduleModalId: "",
      deleteScheduleModalDate: "",
      success: false,
      error: false,
      warning: false,
      info: false,
      none: false,
    };
    this.submit = this.submit.bind(this);
    this.closeDeleteScheduleModal = this.closeDeleteScheduleModal.bind(this);
  }

  onToggle = flag => this.setState({ [flag]: !this.state[flag] });

  closeDeleteScheduleModal = () => {
    this.setState(() => {
      return {
        deleteScheduleModalOpen: false,
      };
    });
  };

  openDeleteScheduleModal = info => {
    // info.el.text //title
    // info.event._instance.range.start.toString().slice(0,15) //startDate
    // info.event._def.publicId; //id
    this.setState(() => {
      return {
        deleteScheduleModalOpen: true,
        deleteScheduleModalTitle: info.el.text,
        deleteScheduleModalId: info.event._def.publicId,
        deleteScheduleModalDate:
          info.event._instance.range.start.toString().slice(0, 15) +
          " - " +
          info.event._instance.range.end.toString().slice(0, 15),
      };
    });
  };

  deleteSchedule = id => {
    let tempEvents = [...this.state.events];
    tempEvents = tempEvents.filter(data => data.id !== id);
    this.setState({
      events: tempEvents,
    });
    this.onToggle("info");
    setTimeout(() => {
      this.onToggle("info");
    }, 2500);
  };

  clickToDo = () => {
    this.setState({
      clickStatus: "ToDo",
    });
  };

  clickPO = () => {
    this.setState({
      clickStatus: "PO",
    });
  };

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
      id: Math.floor(Math.random() * 10000).toString(),
    };
    tempEvents.push(tempObj);
    this.setState({
      events: tempEvents,
      clickStatus: "",
    });
    this.onToggle("success");
    setTimeout(() => {
      this.onToggle("success");
    }, 2500);
  };

  submitPO = () => {
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
      title:
        "[PO]" +
        document.getElementById("qty").value +
        "pc " +
        document.getElementById("searchProduct").value,
      start: startDate,
      end: endDate,
      classNames: "calPO",
      id: Math.floor(Math.random() * 10000).toString(),
    };
    tempEvents.push(tempObj);
    this.setState({
      events: tempEvents,
      clickStatus: "",
    });
    this.onToggle("success");
    setTimeout(() => {
      this.onToggle("success");
    }, 2500);
  };

  render() {
    const { success, error, warning, info, none } = this.state;
    return (
      <div className="py-5 mx-auto">
        <div className="container">
          <div className="row">
            <div className="col-3 dateRange ">
              <div className="col-12 mt-3 mb-3 ">
                <h4 className="col-12 text-center">ADD Schedule</h4>
                <br />
                <ButtonContainer
                  id="addToDo"
                  className={
                    "f1rem col-5 " +
                    (this.state.clickStatus === "ToDo" ? "clickToDo" : "")
                  }
                  onClick={this.clickToDo}
                >
                  To Do
                </ButtonContainer>
                <ButtonContainer
                  id="addSchedule"
                  po
                  className={
                    "f1rem col-5 po " +
                    (this.state.clickStatus === "PO" ? "clickPO" : "")
                  }
                  onClick={this.clickPO}
                >
                  Purchase Order
                </ButtonContainer>
              </div>
              {this.state.clickStatus === "ToDo" ? (
                <div>
                  <div className="col-12 mt-5 text-center">
                    <DateRange className="text-center" />
                  </div>
                  <div className="col-12 mt-5 text-center z0">
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
              ) : this.state.clickStatus === "PO" ? (
                <div>
                  <div className="col-12 mt-5 text-center">
                    <DateRange className="text-center" />
                  </div>
                  <div className="col-12 mt-5 text-center z0">
                    <Autocomplete
                      id="searchProduct"
                      options={this.props.products}
                      getOptionLabel={option => option.title}
                      style={{ width: 200 }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Product"
                          variant="outlined"
                        />
                      )}
                    />
                    <br />
                    <TextField
                      label="Qty"
                      type="number"
                      name="numberformat"
                      id="qty"
                    />
                  </div>
                  <div className="col-12 text-center mt-5">
                    <ButtonContainer id="submit2" da onClick={this.submitPO}>
                      Submit
                    </ButtonContainer>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
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
                eventClick={this.openDeleteScheduleModal}
              />
            </div>
          </div>
        </div>
        <DeleteScheduleModal
          deleteScheduleModalOpen={this.state.deleteScheduleModalOpen}
          closeDeleteScheduleModal={this.closeDeleteScheduleModal}
          deleteSchedule={this.deleteSchedule}
          deleteScheduleModalTitle={this.state.deleteScheduleModalTitle}
          deleteScheduleModalId={this.state.deleteScheduleModalId}
          deleteScheduleModalDate={this.state.deleteScheduleModalDate}
        />
        <NotificationButton
          onToggle={this.onToggle}
          success={success}
          error={error}
          warning={warning}
          info={info}
          none={none}
        />
      </div>
    );
  }
}
