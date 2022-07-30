import { sizes, flavors, fillings, frostings, toppings } from './data.js';
import React, { useEffect, useRef } from 'react';

import { Form, Field } from 'react-final-form';

export const Size = () => {
  let cakeSizes = sizes.map((size, index) => (
    <option key={index} value={size.amount} data-price={size.price || 0}>
      {size.amount}
    </option>
  ));
  return (
    <div>
      <label>Number of Cupcakes</label>
      <Field name="Size" component="select" ref={curSize}>
        <option value="">Select One</option>
        {cakeSizes}
      </Field>
      <Error name="Size" />
    </div>
  );
};

export const Flavors = () => {
  let test = flavors.map((flavor, index) => (
    <option key={index} value={flavor}>
      {flavor}
    </option>
  ));
  return (
    <div>
      <label>Flavor</label>
      <Field name="Flavor" component="select">
        <option value="">Select One</option>
        {test}
      </Field>
      <Error name="Flavor" />
    </div>
  );
};

export const Frosting = () => {
  let test = frostings.map((frosting, index) => (
    <option key={index} value={frosting.type}>
      {frosting.type}
    </option>
  ));
  return (
    <div>
      <label>Frosting</label>
      <Field name="Frosting" component="select">
        <option value="">Select One</option>
        {test}
      </Field>
      <Error name="Frosting" />
    </div>
  );
};

export const Filling = () => {
  let test = fillings.map((filling, index) => (
    <option key={index} value={filling.type} data-price={filling.price || 0}>
      {filling.type}
    </option>
  ));
  return (
    <div>
      <label>Filling</label>
      <Field name="Filling" component="select" ref={curFilling}>
        <option value="">Select One</option>
        {test}
      </Field>
      <Error name="Filling" />
    </div>
  );
};

export const Topping = () => {
  let test = toppings.map((topping, index) => (
    <option key={index} value={topping.topping} data-price={topping.price || 0}>
      {topping.topping}
    </option>
  ));
  return (
    <div>
      <label>Topping</label>
      <Field name="Topping" component="select" ref={curTopping}>
        <option value="">Select One</option>
        {test}
      </Field>
      <Error name="Topping" />
    </div>
  );
};
