import React from "react";
import styled from "styled-components";
import { ButtonContainer } from "./styled/Button";
import { Link } from "react-router-dom";

export default function DeleteScheduleModal({
  deleteScheduleModalOpen,
  closeDeleteScheduleModal,
  deleteScheduleModalTitle,
  deleteScheduleModalId,
  deleteScheduleModalDate,
  deleteSchedule,
}) {
  return (
    <React.Fragment>
      {!deleteScheduleModalOpen ? null : (
        <ModalContainer>
          <div className="container">
            <div className="row">
              <div
                id="modal"
                className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize"
              >
                <h2>Are you sure to delete this schedule?</h2>
                <h5>{deleteScheduleModalTitle}</h5>
                <h5>{deleteScheduleModalDate}</h5>
                <Link to="/schedule">
                  <ButtonContainer onClick={() => closeDeleteScheduleModal()}>
                    cancel
                  </ButtonContainer>
                </Link>
                <Link to="/schedule">
                  <ButtonContainer
                    cart
                    onClick={() => {
                      closeDeleteScheduleModal();
                      deleteSchedule(deleteScheduleModalId);
                    }}
                  >
                    delete
                  </ButtonContainer>
                </Link>
              </div>
            </div>
          </div>
        </ModalContainer>
      )}
    </React.Fragment>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
    margin-left: 0 !important;
    border-radius: 2rem;
    padding: 3rem;
    z-index: 10;
  }
`;
