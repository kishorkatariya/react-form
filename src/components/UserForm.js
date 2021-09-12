import { Button, Typography } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { useParams } from "react-router";
import { connect } from 'react-redux';
import { setAnswers } from '../Actions/index';

const UserForm = (props) => {
  let history = useHistory();
  let { id } = useParams();
  let [paragraph, setParagraph] = useState('')
  let [{ questions, doc_name, doc_desc }, { }] = useStateValue();

  let [radio, setRadio] = useState('')
  let [checked, setCheckBox] = useState('')
  let [{ questions_main }] = useStateValue();
  const inputNameRef = useRef();
  const inputDateRef = useRef();
  // const location = useLocation();

  let [state, setState] = useState({ ans: "" })

  const selectinput = (que, value) => {
    setParagraph(value)
  }

  const setAns = (ans) => {
    setState({ ans: ans })
  }

  const selectcheck = (e, que, option) => {
    setCheckBox(option)
  }

  const select = (que, option) => {
    setRadio(option)
  }

  const submit = (id) => {
    let newCount = 1;
    if (localStorage.getItem(`${id}`) !== null && localStorage.getItem(`${id}`) !== undefined) {
      newCount = Number(localStorage.getItem(`${id}`)) + 1;
      localStorage.setItem(`${id}`, newCount);
    } else {
      localStorage.setItem(`${id}`, newCount);
    }

    let AnsArray = {
      "unique_id": id,
      "form_name": inputNameRef.current.value,
      "answer_url": window.location.href,
      "created_at": inputDateRef.current.value,
      "response_count": newCount,
    }

    props.setAnswers(AnsArray)

    history.push(`/response`)
  }

  const cancel = () => {
    history.push(`/home`)
  }


  if (props && props.reduxInfo && props.reduxInfo.questions) {
    props.reduxInfo.questions.map(item => {
      if (item.unique_id === id) {
        questions_main = item;
      }
    });
  }

  return (
    <div className="submit">
      <div className="user_form">
        <div className="user_form_section">
          {/* {
            questions_main !== undefined && questions_main.length > 0 ? questions_main.map((list, qindex) => ( */}
          <>
            <div className="user_title_section">
              <Typography className="form_name">{questions_main.document_name}</Typography>
              <Typography className="form_desc">{questions_main.doc_desc}</Typography>
              <input type='hidden' name="form_name" ref={inputNameRef} value={questions_main.document_name} />
              <input type='hidden' name="date" ref={inputDateRef} value={questions_main.date} />
            </div>
            {
              questions_main.questions.map((optionList, index) => (
                <>
                  <div className="user_form_questions">
                    <Typography className="question_text">{index + 1}.  {optionList.questionText}</Typography>
                    <div key={index} className="option_text">
                      <div className="option_text_inner">
                        <div className="form-check">
                          {optionList.options.map((subOptionList, i) =>
                            <>
                              {optionList.questionType != "radio" ? (
                                optionList.questionType != 'text' ? (
                                  <label key={i}>
                                    <input
                                      type={optionList.questionType}
                                      name={index}
                                      value={subOptionList.optionText}
                                      className="form-check-input"
                                      required={optionList.required}
                                      // onChange={(e) => { selectcheck(e.target.checked, optionList.questionText, subOptionList.optionText) }}
                                      onChange={(e) => { setAns(subOptionList.optionText) }}
                                    />
                                    {subOptionList.optionText}
                                  </label>) : (

                                  <label>
                                    <input
                                      type={optionList.questionType}
                                      name={index}
                                      value={state.ans}
                                      className="form-check-input text"
                                      required={optionList.required}
                                      // onChange={(e) => { selectinput(optionList.questionText, e) }}
                                      onChange={(e) => { setAns(e.target.value) }}
                                    />
                                  </label>
                                )
                              )
                                : (
                                  <label>
                                    <input
                                      type={optionList.questionType}
                                      name={index}
                                      value={subOptionList.optionText}
                                      className="form-check-input"
                                      required={optionList.required}
                                      // onChange={() => { select(optionList.questionText, subOptionList.optionText) }}
                                      onChange={() => { setAns(subOptionList.optionText) }}
                                    />
                                    {subOptionList.optionText}
                                  </label>
                                )
                              }
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
            }
          </>
          <div className="user_form_submit" >
            <Button variant="contained" color="primary" onClick={() => submit(id)}>Submit</Button>
            <Button variant="contained" color="default" style={{ marginLeft: "5px" }} onClick={cancel}>Cancel</Button>
          </div>
        </div>

      </div>
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    reduxInfo: state.reducer,
  }
}

export default connect(mapStateToProps, { setAnswers })(UserForm)

