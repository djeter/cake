import React from 'react';
import { Field } from 'react-final-form';
import { fillings } from '../data.js';

export default function FillingFlavors({
  updatePrice,
  Error,
  curFrosting,
  curFrostingFlavor,
  idx,
}) {
  try {
    let test = fillings[idx - 1].flavors.map((filling, index) => (
      <option key={index} value={filling}>
        {filling}
      </option>
    ));
    return (
      <>
        <Field name="Filling_Flavors" component="select" ref={curFillingFlavor}>
          <option value="">Select One</option>
          {test}
          <option value="">Skip</option>
        </Field>
        <Error name="Filling_Flavors" />
      </>
    );
  } catch (err) {}
}
