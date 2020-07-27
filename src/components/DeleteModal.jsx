import React from "react";
import styled from "styled-components";
import { ButtonContainer } from "./styled/Button";
import { Link } from "react-router-dom";

export default function DeleteModal({
  deleteModalOpen,
  closeDeleteModal,
  deleteProduct,
  deleteModalProduct,
}) {
  const handleDeleteProduct = () => {
    closeDeleteModal();
    deleteProduct(deleteModalProduct.id);
  };
  return (
    <React.Fragment>
      {!deleteModalOpen ? null : (
        <ModalContainer>
          <div className="container">
            <div className="row">
              <div
                id="modal"
                className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize"
              >
                <h2>Are you sure to delete this item?</h2>
                <img
                  src={deleteModalProduct.img}
                  className="img-fluid"
                  alt="product"
                />
                <h5>{deleteModalProduct.title}</h5>
                <Link to="/">
                  <ButtonContainer onClick={() => closeDeleteModal()}>
                    cancel
                  </ButtonContainer>
                </Link>
                <Link to="/">
                  <ButtonContainer cart onClick={() => handleDeleteProduct()}>
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
  }
`;
