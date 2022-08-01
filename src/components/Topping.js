import React from 'react';
import { Field } from 'react-final-form';
import { toppings } from '../data.js';

export default function ({ updatePrice, curTopping, Error }) {
  let test = toppings.map((topping, index) => (
    <option key={index} value={topping.topping} data-price={topping.price || 0}>
      {topping.topping}
    </option>
  ));
  return (
    <div>
      <label>Topping</label>
      <Field
        name="Topping"
        component="select"
        ref={curTopping}
        onClick={() => updatePrice()}
      >
        <option value="">Select One</option>
        {test}
        <option value="none">Skip</option>
      </Field>
      <Error name="Topping" />
    </div>
  );
}
