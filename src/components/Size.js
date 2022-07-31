import React from 'react';
import { Field } from 'react-final-form';
import { sizes } from '../data.js';

export default function Size({ updatePrice, curSize, Error, required }) {
  let cakeSizes = sizes.map((size, index) => (
    <option key={index} value={size.amount} data-price={size.price || 0}>
      {size.amount}
    </option>
  ));
  return (
    <div>
      <label>Number of Cupcakes</label>
      <Field
        name="Size"
        component="select"
        ref={curSize}
        validate={required}
        onClick={() => updatePrice()}
      >
        <option value="">Select One</option>
        {cakeSizes}
      </Field>
      <Error name="Size" />
    </div>
  );
}
