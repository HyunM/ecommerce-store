import styled from "styled-components";
import React, { Component } from "react";
import { ButtonContainer } from "./styled/Button";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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

export default function AddModal({ addModalOpen, closeAddModal, addProduct }) {
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

  const handleAddProduct = () => {
    if (
      document.getElementById("title").value === "" ||
      document.getElementById("department").value === "" ||
      document.getElementById("price").value === "" ||
      document.getElementById("minStock").value === "" ||
      document.getElementById("inStock").value === ""
    ) {
      return alert("Check required property!!");
    } else {
      closeAddModal();
      const tempItem = {
        title: document.getElementById("title").value,
        company: document.getElementById("company").value,
        info: document.getElementById("info").value,
        department: document.getElementById("department").value,
        price: document.getElementById("price").value.split("$")[1],
        minStock: document.getElementById("minStock").value,
        inStock: document.getElementById("inStock").value,
      };
      addProduct(
        tempItem.title,
        tempItem.company,
        tempItem.info,
        tempItem.department,
        tempItem.price,
        tempItem.minStock,
        tempItem.inStock
      );
    }
  };

  return (
    <React.Fragment>
      {!addModalOpen ? null : (
        <ModalContainer>
          <div className="container">
            <div className="row">
              <div
                id="modal2"
                className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize"
              >
                <h3 className="mt-5">Add New Product</h3>
                <TextField
                  id="title"
                  required
                  label="Title"
                  defaultValue=""
                />{" "}
                <br />
                <TextField id="company" label="Company" defaultValue="" />{" "}
                <br /> <br />
                <TextField
                  id="info"
                  label="Information"
                  multiline
                  rows={8}
                  variant="outlined"
                />{" "}
                <br />
                <br />
                <TextField
                  id="department"
                  label="Department"
                  required
                  defaultValue=""
                />{" "}
                <br /> <br />
                <TextField
                  required
                  id="price"
                  label="amount"
                  name="dollarformat"
                  value={values.numberformat}
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
                <div className="mb-5" id="uploadFiles"></div>
                <div className="mb-5">
                  <Link to="/">
                    <ButtonContainer onClick={() => closeAddModal()}>
                      cancel
                    </ButtonContainer>
                  </Link>
                  <Link to="/">
                    <ButtonContainer add onClick={() => handleAddProduct()}>
                      add product
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

// title short text
// comapny short text
// Info long text
// price $ text
// department dropbox
// min inv number text
// in stock number text
// img attachment

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
  #modal2 {
    background: var(--mainWhite);
    border-radius: 20px 20px;
  }
`;
