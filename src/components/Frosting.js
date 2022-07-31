import React from 'react';
import { Field } from 'react-final-form';
import { frostings } from '../data.js';

export default function Frosting({ Error, curFrosting, curFrostingFlavor }) {
  let test = frostings.map((frosting, index) => (
    <option key={index} value={frosting.type}>
      {frosting.type}
    </option>
  ));
  return (
    <div>
      <label>Frosting</label>
      <Field name="Frosting" component="select" ref={curFrosting}>
        <option value="">Select One</option>
        {test}
        <option value="">Skip</option>
      </Field>
      <Error name="Frosting" />
    </div>
  );
}
