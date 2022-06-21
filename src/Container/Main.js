import React, { useState } from "react";
import CustomButton from "../Components/CustomButton";
import {
  Box,
  Typography,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import Clinical_therapis from "./Clinical_therapis.json";
import Column from "./Column.json";
import "../App.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid #fff`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "#FFF",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

///////////////

const AccordionSummary1 = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowDropDownIcon sx={{ fontSize: "1.5rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "#FFF",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

/////////////

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Main = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [AccordionYes, setAccordionYes] = useState(false);
  const [currentId, setCurentId] = useState("");
  const [cityId, setCityId] = useState("");
  const [cityName, setCityName] = useState("");
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangeCity = (panel, city) => (event, newExpanded) => {
    setCityId(newExpanded ? panel : "");
    setCityName(city === cityName ? "" : city);
  };

  console.log("Clinical_therapis>>>", Clinical_therapis);
  console.log(
    "List CHECK>>>>",
    Clinical_therapis["treatment"]["clinicalTrials"]
  );
  const showColumn = () => {
    return Column.map((col, key) => {
      return (
        <>
          <TableCell>
            <b>{col.col}</b>
          </TableCell>
        </>
      );
    });
  };

  const showRowData = () => {
    return Clinical_therapis["treatment"]["clinicalTrials"].map((row, key) => {
      return (
        <>
          <TableRow
            key={row.trialId}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="left">
              {" "}
              <Link href="#">{row.trialId}</Link>
              <br />
              <>
                <Accordion
                  expanded={expanded === `${row.trialId}`}
                  onChange={handleChange(`${row.trialId}`)}
                >
                  <AccordionSummary1
                    aria-controls="panel1d-content"
                    className="showContent"
                    id={row.trialId}
                    onClick={() => {
                      setCurentId(row.trialId);
                      setAccordionYes(!AccordionYes);
                    }}
                  >
                    {" "}
                    {AccordionYes && currentId === row.trialId ? (
                      <Typography>Hide Details</Typography>
                    ) : (
                      <Typography>Show Contact</Typography>
                    )}
                  </AccordionSummary1>
                  <AccordionDetails>
                    <Typography style={{ width: "auto",color:"#182C61" }}>
                      {row.contact}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            </TableCell>
            <TableCell align="left" style={{ width: 200 }}>
              <span className="head_color">{row.title}</span>
            </TableCell>
            <TableCell align="left" style={{ width: 160 }}>
              <span className="head_color">{row.phase}</span>
            </TableCell>
            <TableCell align="left">
              <div>
                {row.sites.map((item, index) => {
                  return (
                    <>
                      {" "}
                      <Accordion
                        expanded={
                          cityId === row.trialId &&
                          cityName === item.address["city"]
                        }
                        onChange={handleChangeCity(
                          `${row.trialId}`,
                          item.address["city"]
                        )}
                      >
                        <AccordionSummary
                          aria-controls="panel1d-content"
                          id={row.trialId}
                        >
                          {" "}
                          <Typography>{item.address["city"]} &nbsp;</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography style={{color:"#182C61"}}>
                            {item["center"]},{item.address["city"]},
                            {item.address["country"]},Postal Code &nbsp;
                            {item.address["postalCode"]}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </>
                  );
                })}
              </div>
            </TableCell>
          </TableRow>
        </>
      );
    });
  };
  const preventDefault = (event) => event.preventDefault();
  return (
    <div className="APP_show">
      <Box
        sx={{
          typography: "body1",
          "& > :not(style) + :not(style)": {
            ml: 2,
          },
        }}
        onClick={preventDefault}
      ></Box>
      <CustomButton label="Click" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="App head_color">
            AVAILABLE CLINICAL TRAIL-{Clinical_therapis["gene"]}
          </div>
          <span className="head_color">Amplification</span>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "650px" }} aria-label="simple table">
              <TableHead>
                <TableRow>{showColumn()}</TableRow>
              </TableHead>
              <TableBody>{showRowData()}</TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default Main;
