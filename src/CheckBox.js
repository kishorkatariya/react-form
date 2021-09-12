import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm, FormProvider, useFormContext } from "react-hook-form";

export default function CheckBox(props) {
    console.log('props---> ', props.data)
    let count = props.data + 1;
    return (
        <>
            <div>
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                <label class="form-check-label" for="flexCheckDefault">
                    {"Option " + count}
                </label>
            </div>
        </>
    );
}
