import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm, FormProvider, useFormContext } from "react-hook-form";

export default function Radio(props) {
    let count = props.data + 1;
    return (
        // <input
        //     type="radio"
        //     class="form-control"
        // // {...register(`question_name-${props.id}`)}
        // />

        <>
            <div>
                <input class="form-check-input" type="radio" value="" id="flexCheckDefault" checked />
                <label class="form-check-label" for="flexCheckDefault">
                    {"Option " + count}
                </label>
            </div>
        </>
    );
}