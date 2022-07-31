import React from 'react';
import { Field } from 'react-final-form';
import { frostings } from '../data.js';

export default function Frosting({
  Error,
  curFrosting,
  curFrostingFlavor,
  updatePrice,
}) {
  let test = frostings.map((frosting, index) => (
    <option key={index} value={frosting.type}>
      {frosting.type}
    </option>
  ));
  return (
    <>
      <label>Frosting</label>
      <Field
        name="Frosting"
        component="select"
        ref={curFrosting}
        onClick={() => {
          curFrostingFlavor.current.options[
            curFrostingFlavor.current.selectedIndex
          ].setAttribute('value', null);
          curFrostingFlavor.current.dispatchEvent(
            new Event('change', { bubbles: true })
          );
        }}
      >
        <option value="">Select One</option>
        {test}
        <option value="">Skip</option>
      </Field>
      <Error name="Frosting" />
    </>
  );
}
