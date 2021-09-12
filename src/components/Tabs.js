import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import QuestionForm from './QuestionForm';
import { useHistory, useParams } from "react-router";
import { connect } from 'react-redux';

function TabPanel(props) {
  const { children, answersArray, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CenteredTabs = (props) => {

  const history = useHistory();
  const [value, setValue] = useState(2);
  const [response, setResponses] = useState(1);
  const [questions, setQuestions] = useState(0);
  let { id } = useParams();

  let questionsArr = props && props.answersArray.questions && !props.answersArray.questions.includes(null) ? props.answersArray.questions : 0

  let res = props && props.answersArray.answers && !props.answersArray.answers.includes(null) ? props.answersArray.answers : 0

  useEffect(() => {
    if (localStorage.getItem(`${id}`) !== null && localStorage.getItem(`${id}`) !== undefined) {
      setResponses(Number(localStorage.getItem(`${id}`)))
    }
  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className="tabs_wrapper">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        className="tabs"
      >
        <Tab label="Add Question" className="tab" {...a11yProps(0)} />
        <Tab label="Responses" className="tab" {...a11yProps(1)} />
        <Tab label="Questions" className="tab" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <QuestionForm />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div className="submit">
          <div className="user_form" >
            <div className="user_form_section">
              <div className="user_form_questions">
                <div className="user_form_inner">
                  {/* <Typography className="responses">{res ? res : "No"} Responses</Typography> */}
                  <Table >
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">#</TableCell>
                        <TableCell align="right">Form Name</TableCell>
                        <TableCell align="right">Form URL</TableCell>
                        <TableCell align="right">Created At</TableCell>
                        <TableCell align="right">Total Response</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {res.map(row => ( */}

                      {res !== undefined && res !== null && res.length > 0 ? res.map((optionList, index) => (

                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell align="right">{optionList.form_name ? optionList.form_name : ""}</TableCell>
                          {/* <TableCell align="right">{optionList.answer_url}</TableCell> */}
                          <TableCell align="right"><a href={optionList.answer_url}>Click here to answer</a></TableCell>
                          <TableCell align="right">{optionList.created_at}</TableCell>
                          <TableCell align="right">{optionList.response_count}</TableCell>
                        </TableRow>
                      )) :
                        <Typography className="responses">{res ? res : "No"} Responses</Typography>
                      }
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <div className="submit">
          <div className="user_form" >
            <div className="user_form_section">
              <div className="user_form_questions">
                <div className="user_form_inner">
                  {/* <Typography className="responses">{res ? res : "No"} Responses</Typography> */}
                  <Table >
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">#</TableCell>
                        <TableCell align="right">Form Name</TableCell>
                        <TableCell align="right">URL</TableCell>
                        <TableCell align="right">Created At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {res.map(row => ( */}

                      {questionsArr !== undefined && questionsArr.length > 0 ? questionsArr.map((qList, index) => (

                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell align="right">{qList.document_name ? qList.document_name : ""}</TableCell>
                          <TableCell align="right"><a href={"questions/" + qList.unique_id}>Click here to answer</a></TableCell>
                          {/* <TableCell align="right"><button onClick={answerThis(qList.unique_id)}>Click here to answer this</button></TableCell> */}
                          <TableCell align="right">{qList.date}</TableCell>
                        </TableRow>
                      )) :
                        <Typography className="responses">{questionsArr ? questionsArr : "No"} Responses</Typography>
                      }
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>

    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    answersArray: state.reducer
  }
}

export default connect(mapStateToProps, null)(CenteredTabs)