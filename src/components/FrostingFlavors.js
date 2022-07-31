import React from 'react';
import { Field } from 'react-final-form';
import { frostings } from '../data.js';

export default function FrostingFlavors({
  updatePrice,
  Error,
  curFrosting,
  curFrostingFlavor,
  idx,
}) {
  let test = frostings[idx - 1].flavors.map((frosting, index) => (
    <option key={index} value={frosting}>
      {frosting}
    </option>
  ));
  return (
    <>
      <Field name="Frosting_Flavors" component="select" ref={curFrostingFlavor}>
        <option value="">Select One</option>
        {test}
        <option value="">Skip</option>
      </Field>
      <Error name="Frosting_Flavors" />
    </>
  );
}
