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
          try {
            curFrostingFlavor.current.options[
              curFrostingFlavor.current.selectedIndex
            ].setAttribute('value', '');
            curFrostingFlavor.current.dispatchEvent(
              new Event('change', { bubbles: true })
            );
          } catch (err) {}
        }}
      >
        <option value="">Select One</option>
        {test}
        <option value="none">Skip</option>
      </Field>
      <Error name="Frosting" />
    </>
  );
}
