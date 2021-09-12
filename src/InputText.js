import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm, FormProvider, useFormContext } from "react-hook-form";

export default function InputText() {
    return (
        <input
            type="text"
            class="form-control"
        />
    );
}