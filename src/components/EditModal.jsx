import styled from "styled-components";
import React from "react";
import { ButtonContainer } from "./styled/Button";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import Files from "react-files";
import { Link } from "react-router-dom";
import AttachFileIcon from "@material-ui/icons/AttachFile";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function dollarFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

dollarFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function numberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

numberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function EditModal({
  editModalOpen,
  closeEditModal,
  editProduct,
  editModalProduct,
}) {
  const [values, setValues] = React.useState({
    textmask: "(1  )    -    ",
    dollarformat: "0",
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onFilesChange = files => {
    console.log(files);
    let totalFiles = [];
    files.forEach(element => {
      document.getElementById("uploadFiles").innerHTML = element.name;
      totalFiles.push(element.name);
    });
    console.log(totalFiles);
  };

  const onFilesError = (error, file) => {
    console.log("error code " + error.code + ": " + error.message);
  };

  const handleEditProduct = () => {
    if (
      document.getElementById("title").value === "" ||
      document.getElementById("department").value === "" ||
      document.getElementById("price").value === "" ||
      document.getElementById("minStock").value === "" ||
      document.getElementById("inStock").value === ""
    ) {
      return alert("Check required property!!");
    } else {
      closeEditModal();
      let tempItem = {
        id: editModalProduct.id,
        title: document.getElementById("title").value,
        company: document.getElementById("company").value,
        info: document.getElementById("info").value,
        department: document.getElementById("department").value,
        price: document.getElementById("price").value.split("$")[1],
        minStock: document.getElementById("minStock").value,
        inStock: document.getElementById("inStock").value,
      };
      editProduct(
        tempItem.id,
        tempItem.title,
        tempItem.company,
        tempItem.info,
        tempItem.department,
        tempItem.price,
        tempItem.minStock,
        tempItem.inStock
      );
    }

    closeEditModal();
  };

  return (
    <React.Fragment>
      {!editModalOpen ? null : (
        <ModalContainer>
          <div className="container">
            <div className="row">
              <div
                id="modal"
                className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize"
              >
                <h3 className="mt-5">Edit Product</h3>
                <TextField
                  id="title"
                  required
                  label="Title"
                  defaultValue={editModalProduct.title}
                />{" "}
                <br />
                <TextField
                  id="company"
                  label="Company"
                  defaultValue={editModalProduct.company}
                />{" "}
                <br /> <br />
                <TextField
                  id="info"
                  label="Information"
                  multiline
                  rows={8}
                  variant="outlined"
                  defaultValue={editModalProduct.info}
                />{" "}
                <br />
                <br />
                <TextField
                  id="department"
                  label="Department"
                  required
                  defaultValue={editModalProduct.department}
                />{" "}
                <br /> <br />
                <TextField
                  required
                  id="price"
                  label="amount"
                  name="dollarformat"
                  value={values.numberformat}
                  defaultValue={editModalProduct.price}
                  onChange={handleChange}
                  InputProps={{
                    inputComponent: dollarFormatCustom,
                  }}
                />
                <br />
                <br />
                <TextField
                  required
                  id="minStock"
                  label="Minimum Stock Level"
                  name="numberformat1"
                  value={values.numberformat}
                  defaultValue={editModalProduct.minStock}
                  onChange={handleChange}
                  InputProps={{
                    inputComponent: numberFormatCustom,
                  }}
                />
                <br />
                <br />
                <TextField
                  required
                  id="inStock"
                  label="In Stock"
                  name="numberformat2"
                  value={values.numberformat}
                  defaultValue={editModalProduct.inStock}
                  onChange={handleChange}
                  InputProps={{
                    inputComponent: numberFormatCustom,
                  }}
                />
                <br />
                <br />
                <Files
                  className="files-dropzone cp"
                  onChange={onFilesChange}
                  onError={onFilesError}
                  accepts={["image/png", ".pdf"]}
                  multiple
                  maxFiles={10}
                  maxFileSize={10000000}
                  minFileSize={0}
                  clickable
                >
                  <AttachFileIcon />
                  Click to upload image
                </Files>
                <div className="mb-5" id="uploadFiles">
                  {editModalProduct.img}
                </div>
                <div className="mb-5">
                  <Link to="/">
                    <ButtonContainer onClick={() => closeEditModal()}>
                      cancel
                    </ButtonContainer>
                  </Link>
                  <Link to="/">
                    <ButtonContainer cart onClick={() => handleEditProduct()}>
                      edit
                    </ButtonContainer>
                  </Link>
                </div>
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
