import React from 'react';
import { Field } from 'react-final-form';
import { flavors } from '../data.js';

export default function Flavors({ required, Error }) {
  let test = flavors.map((flavor, index) => (
    <option key={index} value={flavor}>
      {flavor}
    </option>
  ));
  return (
    <div>
      <label>Flavor</label>
      <Field name="Flavor" component="select" validate={required}>
        <option value="">Select One</option>
        {test}
      </Field>
      <Error name="Flavor" />
    </div>
  );
}
