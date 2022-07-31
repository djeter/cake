import React from 'react';
import { Field } from 'react-final-form';
import { fillings } from '../data.js';

export default function Filling({
  updatePrice,
  curFilling,
  Error,
  curFillingFlavor,
}) {
  let test = fillings.map((filling, index) => (
    <option key={index} value={filling.type} data-price={filling.price || 0}>
      {filling.type}
    </option>
  ));

  return (
    <>
      <label>Filling</label>
      <Field
        name="Filling"
        component="select"
        ref={curFilling}
        onClick={() => {
          updatePrice();
          try {
            curFillingFlavor.current.options[
              curFillingFlavor.current.selectedIndex
            ].setAttribute('value', '');
            curFillingFlavor.current.dispatchEvent(
              new Event('change', { bubbles: true })
            );
          } catch (err) {}
        }}
      >
        <option value="">Select One</option>
        {test}
        <option value="">Skip</option>
      </Field>
      <Error name="Filling" />
    </>
  );
}
