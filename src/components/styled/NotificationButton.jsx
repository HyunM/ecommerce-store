import React, { Component } from "react";
import "./NotificationButton.css";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { Slide } from "@progress/kendo-react-animation";

export default class NotificationButton extends Component {
  render() {
    const { success, error, warning, info, none, onToggle } = this.props;
    return (
      <div>
        <NotificationGroup
          style={{
            right: 0,
            bottom: 0,
            alignItems: "flex-start",
            flexWrap: "wrap-reverse",
          }}
        >
          {/* Green */}
          <Slide direction={success ? "up" : "down"}>
            {success && (
              <Notification
                type={{ style: "success", icon: true }}
                closable={true}
                onClose={() => onToggle("success")}
              >
                <span>Your data has been saved.</span>
              </Notification>
            )}
          </Slide>

          {/* Red */}
          <Slide direction={error ? "up" : "down"}>
            {error && (
              <Notification
                type={{ style: "error", icon: true }}
                closable={true}
                onClose={() => onToggle("error")}
              >
                <span>Oops! Something went wrong ...</span>
              </Notification>
            )}
          </Slide>

          {/* Yellow */}
          <Slide direction={warning ? "up" : "down"}>
            {warning && (
              <Notification
                type={{ style: "warning", icon: true }}
                closable={true}
                onClose={() => onToggle("warning")}
              >
                <span>Your data has been modified.</span>
              </Notification>
            )}
          </Slide>

          {/* Blue */}
          <Slide direction={info ? "up" : "down"}>
            {info && (
              <Notification
                type={{ style: "info", icon: true }}
                closable={true}
                onClose={() => onToggle("info")}
              >
                <span>Your data has been deleted.</span>
              </Notification>
            )}
          </Slide>

          {/* Unstyled */}
          <Slide direction={none ? "up" : "down"}>
            {none && (
              <Notification
                type={{ style: "none", icon: false }}
                closable={true}
                onClose={() => onToggle("none")}
                style={{ overflow: "visible" }}
              >
                <span>Hanna Moos likes your status.</span>
              </Notification>
            )}
          </Slide>
        </NotificationGroup>
        <my-app>
          <span className="k-icon k-i-loading" hidden={true}></span>
        </my-app>
      </div>
    );
  }
}
