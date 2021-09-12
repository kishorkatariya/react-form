import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ShortTextIcon from '@material-ui/icons/ShortText';
import { BsTrash } from "react-icons/bs"
import { IconButton } from '@material-ui/core';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { useStateValue } from '../StateProvider'
import { useParams } from "react-router";
import { StoreQuestions } from '../Actions/index';
import { connect } from 'react-redux'

const QuestionForm = (props) => {
  const [{ }, dispatch] = useStateValue();
  const [questions, setQuestions] = useState([]);
  const [documentName, setDocName] = useState("Untitled Form");
  const [documentDescription, setDocDesc] = useState("Form description");
  const [questionType, setType] = useState("radio");
  let { id } = useParams();
  let history = useHistory();
  let today = new Date();
  const [date, setDate] = useState(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes());

  useEffect(() => {
    let newQuestion = { questionText: "Question", answer: false, questionType: "radio", options: [{ optionText: "Option 1" }], open: true, required: false }
    setQuestions([...questions, newQuestion])
  }, [])

  useEffect(() => {
  }, [])

  const changeType = (e) => {
    setType(e.target.id)
  }

  useEffect(() => {
    setType(questionType)
  }, [changeType])

  const addMoreQuestionField = () => {
    expandCloseAll();
    setQuestions(questions => [...questions, { questionText: "Question", questionType: "radio", options: [{ optionText: "Option 1" }], open: true, required: false }]);
  }

  const addQuestionType = (i, type) => {
    let ques = [...questions];
    ques[i].questionType = type;
    setQuestions(ques);
  }

  const copyQuestion = (i) => {
    expandCloseAll();
    let ques = [...questions];
    let newQuestion = ques[i];
    setQuestions([...questions, newQuestion])
  }

  const deleteQuestion = (i) => {
    let ques = [...questions];
    if (questions.length > 1) {
      ques.splice(i, 1);
    }
    setQuestions(ques)
  }


  const saveForm = () => {
    var uniqueID = "id" + Math.random().toString(16).slice(2)
    let Arr = [{
      "unique_id": uniqueID,
      "date": date,
      "document_name": documentName,
      "doc_desc": documentDescription,
      "questions": questions,
    }]

    let newData = props && props.reduxInfo.questions && props.reduxInfo.questions ? props.reduxInfo.questions.concat(Arr) : Arr

    props.StoreQuestions(newData)

    window.location.reload()

    history.push(`/response`)
  }

  const handleOptionValue = (text, i, j) => {
    let optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j].optionText = text;
    setQuestions(optionsOfQuestion);
  }

  const handleQuestionValue = (text, i) => {
    let optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionText = text;
    setQuestions(optionsOfQuestion);
  }

  const addOption = (i) => {
    let optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 4) {
      optionsOfQuestion[i].options.push({ optionText: "Option " + (optionsOfQuestion[i].options.length + 1) })
    } else {
      window.alert("Max  4 options allowed");
    }
    setQuestions(optionsOfQuestion)
  }

  const removeOption = (i, j) => {
    let optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length > 1) {
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion)
    }
  }

  const expandCloseAll = () => {
    let ques = [...questions];
    for (let j = 0; j < ques.length; j++) {
      ques[j].open = false;
    }
    setQuestions(ques);
  }

  const handleExpand = (i) => {
    let ques = [...questions];
    for (let j = 0; j < ques.length; j++) {
      if (i === j) {
        ques[i].open = true;
      } else {
        ques[j].open = false;
      }
    }
    setQuestions(ques);
  }

  const questionsUI = () => {
    return questions.map((ques, i) => (
      <div>
        <div className="form_wrapper">
          <div className="question_break">
            <DragIndicatorIcon className="drag_icon" fontSize="small" />
          </div>

          <Accordion onChange={() => { handleExpand(i) }} expanded={questions[i].open}
            className={questions[i].open ? 'add_border' : ""} >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              elevation={1} style={{ width: '100%' }}
            >
              {!questions[i].open ? (
                <div className="saved_questions">
                  <Typography className="ques_text">{i + 1}.  {ques.questionText}</Typography>
                  {ques.options.map((op, j) => (
                    <div key={j}>
                      <div className="options_wrap" >
                        {
                          (ques.questionType !== "text") ?
                            <FormControlLabel className="options_label"
                              disabled control={<input className="options_type" type={ques.questionType} color="primary" required={ques.type} />}
                              label={<Typography className="options_text">{ques.options[j].optionText}</Typography>} /> :
                            <FormControlLabel className="options_label"
                              disabled control={<input className="options_type text" type={ques.questionType} color="primary" placeholder="Text" required={ques.type} />}
                              label="" />
                        }
                      </div>
                    </div>
                  ))}
                </div>
              ) : ""}
            </AccordionSummary>
            <div className="question_boxes">
              {!ques.answer ? (<AccordionDetails className="add_question" >
                <div>
                  <div className="add_question_top">
                    <input type="text" className="question" placeholder="Question" value={ques.questionText} onChange={(e) => { handleQuestionValue(e.target.value, i) }}></input>

                    <Select value={ques.questionType ? ques.questionType.toString().charAt(0).toUpperCase() + ques.questionType.toString().slice(1) : "Radio"} className="select">
                      <MenuItem id="text" value="Text" onClick={() => { addQuestionType(i, "text") }}> <ShortTextIcon className="select_icon" />  Paragraph</MenuItem>
                      <MenuItem id="checkbox" value="Checkbox" onClick={() => { addQuestionType(i, "checkbox") }}><Checkbox className="select_icon" checked /> Checkboxes</MenuItem>
                      <MenuItem id="radio" value="Radio" onClick={() => { addQuestionType(i, "radio") }}> <Radio className="select_icon" checked /> Radio</MenuItem>
                    </Select>
                  </div>

                  {ques.options.map((op, j) => (
                    <div className="add_question_body" key={j}>
                      {
                        (ques.questionType !== "text") ?
                          <input type={ques.questionType} className="icon" /> :
                          <ShortTextIcon className="icon_text" />
                      }
                      <div >
                        {
                          (ques.questionType !== "text") ?
                            <input type="text" className="text_input" placeholder="Option" value={ques.options[j].optionText} onChange={(e) => { handleOptionValue(e.target.value, i, j) }}></input> :
                            <input type="text" className="text_input" placeholder="Paragraph" value="" onChange={(e) => { handleOptionValue(e.target.value, i, j) }}></input>
                        }

                      </div>
                      <IconButton aria-label="delete" onClick={() => { removeOption(i, j) }}>
                        <CloseIcon />
                      </IconButton>
                    </div>
                  ))}
                  {ques.questionType !== "text" && ques.options.length < 4 ? (
                    <div className="add_question_body">
                      <FormControlLabel disabled control={
                        <input type={ques.questionType} className="icon-box" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} disabled />
                      } label={
                        <div>
                          <input type="text" className="text_input_value" placeholder="Add other"></input>
                          <Button size="small" className="add_button" onClick={() => { addOption(i) }}>Add Option</Button>
                        </div>
                      } />
                    </div>
                  ) : ""}
                  <div className="add_footer">
                    <div className="add_question_bottom_left">
                    </div>

                    <div className="add_question_bottom">
                      <IconButton aria-label="Copy" onClick={() => { copyQuestion(i) }} title="copy option">
                        <FilterNoneIcon />
                      </IconButton>

                      <IconButton aria-label="delete" onClick={() => { deleteQuestion(i) }} title="delete option">
                        <BsTrash />
                      </IconButton>
                      {!ques.answer ? (<div className="question_edit" title="add more option">
                        <AddCircleOutlineIcon onClick={addMoreQuestionField} className="edit" title="Add more question" />
                      </div>) : ""}
                    </div>
                  </div>
                </div>

              </AccordionDetails>) : ''}
            </div>
          </Accordion>
        </div>
      </div>
    ))
  }

  return (
    <div>
      <div className="question_form">
        <br></br>
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
              <input type="text" className="question_form_top_name" placeholder={documentName} value={documentName} onChange={(e) => { setDocName(e.target.value) }}></input>
              <input type="text" className="question_form_top_desc" placeholder="Form Description" placeholder={documentDescription} value={documentDescription} onChange={(e) => { setDocDesc(e.target.value) }} ></input>
            </div>
          </div>
          {questionsUI()}
          <div className="save_form">
            <Button variant="contained" color="primary" onClick={() => saveForm()}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    reduxInfo: state.reducer,
  }
}

export default connect(mapStateToProps, { StoreQuestions })(QuestionForm);
