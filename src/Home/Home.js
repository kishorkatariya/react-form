
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import CheckBox from '../CheckBox';
import Radio from '../Radio';
import InputText from '../InputText';

const QuestionForm = (props) => {

    const [state, setState] = useState({
        temparature: false,
    })

    const [mcqForm, setMcqForm] = useState({
        questions: '',
        option_type: 'radio',
        option_data: [{ 'label': 'option 1', 'value': '', 'selected': false }],
    })

    const defaultForm = {
        questions: '',
        option_type: 'radio',
        option_data: [{ 'label': 'option 1', 'value': '', 'selected': false }],
    }

    const [optValue, setDropDownOption] = useState("radio")

    const handleOptionChange = (e) => {
        console.log(e.target.value)
        setDropDownOption(e.target.value)
    }

    const [question_name, questionState] = useState({
        question_name: "",
    })

    const questionNameChange = (e) => {
        questionState({ question_name: e.target.value })
    }



    const addOption = (index) => {
        console.log(index)
        let mcqFormD = { ...mcqForm }
        let optionData = mcqForm.option_data;
        optionData.push({ 'label': 'option ' + index, 'value': '', 'selected': false })
        mcqFormD = { ...mcqFormD, option_data: optionData }
        setMcqForm(mcqFormD)
    }

    // const { register, handleSubmit } = useFormContext();

    const optionList = (optValue) => {
        console.log('optValue-- ', mcqForm)
        // return <Radio />
        let options = ""
        switch (optValue) {
            case "radio":
                options = mcqForm.option_data.map((list, index) => {
                    console.log('radio-- ', optValue, index)
                    return <>
                        <Radio data={index} />
                        {mcqForm.option_data.length - 1 === index && mcqForm.option_data.length < 4 &&
                            <button type="button" class="btn btn-primary" style={{ marginTop: "30px" }} onClick={() => addOption(index + 2)}>+
                            </button>
                        }
                    </>
                });
                break;
            case "text_box":
                console.log('text-- ', optValue)
                options = mcqForm.option_data.map((list, index) => {
                    return <><InputText />
                        {mcqForm.option_data.length - 1 === index && mcqForm.option_data.length < 4 &&
                            <button type="button" class="btn btn-primary" style={{ marginTop: "30px" }} onClick={() => addOption(index + 2)}>+
                            </button>
                        }
                    </>
                })
                break;
            case "check_box":
                options = mcqForm.option_data.map((list, index) => {
                    console.log('check-- ', optValue, '?? ', index)
                    return <><CheckBox data={index} />
                        {mcqForm.option_data.length - 1 === index && mcqForm.option_data.length < 4 &&
                            <button type="button" class="btn btn-primary" style={{ marginTop: "30px" }} onClick={() => addOption(index + 2)}>+
                            </button>
                        }
                    </>
                })
                break;
            default:
                options = mcqForm.option_data.map(() => {
                    return <Radio />
                })
        }
        return options;
    }

    return (
        <>
            <div class="card">
                <div class="card-body">
                    <div class="form-group col-md-12">
                        <div className="row">
                            <div class="form-group col-md-6">
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">Question: </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter here"
                                        required
                                        name="question_name"
                                        onChange={questionNameChange}
                                    />
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <div class="form-group">
                                    <label for="exampleFormControlSelect1" >Answer Type:</label>
                                    <select class="form-control" id="exampleFormControlSelect1" onChange={handleOptionChange} value={optValue} required>
                                        <option value="radio" selecte>Radio Button</option>
                                        <option value="text_box">Text Box</option>
                                        <option value="check_box" selecte>Check Box</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-md-12">
                        <div className="row">
                            <div class="form-group col-md-6">
                                <div class="form-group">
                                    {optionList(optValue)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
const initialStudentForms = [
    {
        id: "student-one",
        Form: QuestionForm, name: "xyz", questionName: question_name
    }
];

// return (
// <React.Fragment>
//     <h1>Table----------------</h1>
//     <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>


//     <table class="table" style={{ width: '800px', "margin-left": '200px' }}>
//         <thead>
//             <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">First</th>
//                 <th scope="col">Last</th>
//                 <th scope="col">Handle</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <th scope="row">1</th>
//                 <td>Mark</td>
//                 <td>Otto</td>
//                 <td>@mdo</td>
//             </tr>
//             <tr>
//                 <th scope="row">2</th>
//                 <td>Jacob</td>
//                 <td>Thornton</td>
//                 <td>@fat</td>
//             </tr>
//             <tr>
//                 <th scope="row">3</th>
//                 <td colspan="2">Larr</td>;
//             </tr>
//         </tbody>
//     </table>

//     <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
//         <div class="modal-dialog modal-lg">
//             <div class="modal-content">
//                 <div class="modal-header">
//                     <h5 class="modal-title" id="exampleModalLabel">Create New Form</h5>
//                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                         <span aria-hidden="true">&times;</span>
//                     </button>
//                 </div>
//                 <div class="modal-body">
//                     <div class="card">
//                         <div class="card-body">
//                             <form>
//                                 <div class="form-group col-md-12">
//                                     <div className="row">
//                                         <div class="form-group col-md-6">
//                                             <div class="form-group">
//                                                 <label for="recipient-name" class="col-form-label">Question: </label>
//                                                 <input type="text" class="form-control" id="recipient-name" />
//                                             </div>
//                                         </div>

//                                         <div class="form-group col-md-4">
//                                             <div class="form-group">
//                                                 <label for="exampleFormControlSelect1" onChange={handleOptionChange}>Answer Type:</label>
//                                                 <select class="form-control" id="exampleFormControlSelect1">
//                                                     <option>Text Box</option>
//                                                     <option>Check Box</option>
//                                                     <option>Radio Button</option>
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div class="form-group col-md-2">
//                                             <div class="form-group">
//                                                 <button type="button" class="btn btn-primary" style={{ marginTop: "30px" }}>+</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>

//                 </div>
//                 <div class="modal-footer">
//                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//                     <button type="button" class="btn btn-primary">Save Form</button>
//                 </div>
//             </div>
//         </div>
//     </div>
// </React.Fragment>
// );
export default function Home() {
    const [studentForms, addMoreForm] = useState(initialStudentForms);
    const methods = useForm();

    console.log('studentForms--> ', studentForms)

    const addMore = () => {
        addMoreForm([
            ...studentForms,
            {
                id: "new-generated-id",
                Form: QuestionForm
            }
        ]);
    };

    const [state, setState] = useState({
        temparature: false
    })

    const handleOptionChange = useState({
        temparature: true
    })

    const submitData = async (formData) => {
        console.log(formData);
        addMore();
    };

    return (
        <FormProvider {...methods}>
            <div className="App">
                <React.Fragment>
                    <h1>Table----------------</h1>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Add Form</button>


                    <table class="table" style={{ width: '800px', "margin-left": '200px' }}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larr</td>;
                            </tr>
                        </tbody>
                    </table>

                    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Create New Form</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="card">
                                        <div class="card-body">
                                            {/* <form>
                                                <div class="form-group col-md-12">
                                                    <div className="row">
                                                        <div class="form-group col-md-6">
                                                            <div class="form-group">
                                                                <label for="recipient-name" class="col-form-label">Question: </label>
                                                                <input type="text" class="form-control" id="recipient-name" />
                                                            </div>
                                                        </div>

                                                        <div class="form-group col-md-4">
                                                            <div class="form-group">
                                                                <label for="exampleFormControlSelect1" onChange={handleOptionChange}>Answer Type:</label>
                                                                <select class="form-control" id="exampleFormControlSelect1">
                                                                    <option>Text Box</option>
                                                                    <option>Check Box</option>
                                                                    <option>Radio Button</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group col-md-2">
                                                            <div class="form-group">
                                                                <button type="button" class="btn btn-primary" style={{ marginTop: "30px" }}>+</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form> */}
                                            {studentForms.map(({ id, Form }) => (
                                                <Form key={id} id={id} />
                                            ))}
                                            <br />
                                            <button onClick={methods.handleSubmit(submitData)}>Save Form</button>{" "}
                                            <button onClick={addMore}>Add More</button>
                                        </div>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save Form</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>


            </div>
        </FormProvider>
    );
}