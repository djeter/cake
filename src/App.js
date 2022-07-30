import React, { useState, useRef } from 'react';
import './style.css';
import Styles from './Styles';
import { Form, Field } from 'react-final-form';
import Wizard from './Wizard';
import createDecorator from 'final-form-calculate';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
);
const required = (value) => (value ? undefined : 'Required');

const flavors = [
  'Vanilla',
  'Chocolate',
  'Confetti',
  'Strawberry',
  'Cookies and Cream',
  'Red Velvet',
  'Chocolate Chip',
  'Cinnamon Swirl',
  'Lemon',
];
const fillings = [
  {
    type: 'Fruit',
    flavors: ['Strawberry', 'Blueberry', 'Raspberry', 'Peach', 'Pineapple'],
    price: 5,
  },
  {
    type: 'Pudding',
    flavors: ['Vanilla', 'Chocolate', 'Banana'],
    price: 5,
  },
];
const frostings = [
  {
    type: 'American Buttercream',
    flavors: ['Vanilla', 'Chocolate', 'Lemon', 'Strawberry'],
  },
  {
    type: 'Swiss Meringue',
    flavors: ['Vanilla', 'Chocolate', 'Lemon', 'Strawberry'],
  },
  {
    type: 'Ganache',
    flavors: ['White', 'Milk', 'Semi-Sweet ', 'Dark'],
  },
  {
    type: 'Whipped Cream',
    flavors: ['Vanilla', 'Chocolate', 'Lemon', 'Strawberry'],
  },
  { type: 'Cream Cheese' },
];
const toppings = [
  { topping: 'Sprinkles', price: 0 },
  { topping: 'White Chocolate Drip', price: 2 },
  { topping: 'Chocolate Drip', price: 2 },
];
const sizes = [
  { amount: 'Dozen (12)', price: 25 },
  { amount: 'Half Dozen (6)', price: 15 },
];

export default function App() {
  const Size = () => {
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

  const Flavors = () => {
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

  const Frosting = () => {
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

  const Filling = () => {
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

  const Topping = () => {
    let test = toppings.map((topping, index) => (
      <option
        key={index}
        value={topping.topping}
        data-price={topping.price || 0}
      >
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

  const curSize = useRef();
  const curTopping = useRef();
  const curFilling = useRef();
  const calculator = createDecorator({
    field: 'calcButton',
    updates: {
      Price: () => {
        return (
          parseInt(
            curTopping.current.options[curTopping.current.selectedIndex].dataset
              .price
              ? curTopping.current.options[curTopping.current.selectedIndex]
                  .dataset.price
              : 0
          ) +
          parseInt(
            curSize.current.options[curSize.current.selectedIndex].dataset.price
              ? curSize.current.options[curSize.current.selectedIndex].dataset
                  .price
              : 0
          ) +
          parseInt(
            curFilling.current.options[curFilling.current.selectedIndex].dataset
              .price
              ? curFilling.current.options[curFilling.current.selectedIndex]
                  .dataset.price
              : 0
          )
        );
      },
    },
  });
  return (
    <Styles>
      <h1>Delicious N’ Sweet</h1>
      <h2>Cupcake Wizard Form</h2>
      <p>
        Please follow the steps in the wizard to build your perfect cupcake!
      </p>
      <Form
        initialValues={{ Price: 0 }}
        validate={(foo) => console.log('validating', foo)}
        onSubmit={onSubmit}
        decorators={[calculator]}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Size />
            <Flavors />
            <Filling />
            <Frosting />
            <Topping />
            <div>
              <label>Notes</label>
              <Field name="notes" component="textarea" placeholder="Notes" />
              <Error name="notes" />
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </Styles>
  );
}
