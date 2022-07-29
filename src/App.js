import React, { useState, useRef } from 'react';
import './style.css';
import Styles from './Styles';
import { Field } from 'react-final-form';
import Wizard from './Wizard';
import createDecorator from 'final-form-calculate'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const updatePrice = async (values) => {
  await sleep(300);
  window.alert(values);
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
  },
  {
    type: 'Pudding',
    flavors: ['Vanilla', 'Chocolate', 'Banana'],
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
const toppings = ['Sprinkles', 'White Chocolate Drip', 'Chocolate Drip'];
const sizes = [
  { amount: 'Dozen (12)', price: 25 },
  { amount: 'Half Dozen (6)', price: 15 },
];

export default function App() {
  let [updatedPrice, setUpdatedPrice] = useState(230);


const calculator = createDecorator(
  {
    field: 'minimum', // when minimum changes...
    updates: {
      // ...update maximum to the result of this function
      maximum: (minimumValue, allValues) =>
        Math.max(minimumValue || 0, allValues.maximum || 0)
    }
  },
  {
    field: 'maximum', // when maximum changes...
    updates: {
      // update minimum to the result of this function
      minimum: (maximumValue, allValues) =>
        Math.min(maximumValue || 0, allValues.minimum || 0)
    }
  },
  {
    field: /day\[\d\]/, // when a field matching this pattern changes...
    updates: {
      // ...update the total to the result of this function
      Price: (ignoredValue, allValues) =>
        (allValues.Size || [])
          .reduce((sum, value) => sum + Number(value || 0), 0)
    }
  }
)

  const Size = () => {
    let cakeSizes = sizes.map((size, index) => (
      <option key={index} value={size.amount}>
        {size.amount}
      </option>
    ));
    return (
      <div>
        <label>Number of Cupcakes</label>
        <Field
          name="Size"
          component="select"
          onChange={() => setUpdatedPrice()}
        >
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
      <option key={index} value={filling.type}>
        {filling.type}
      </option>
    ));
    return (
      <div>
        <label>Filling</label>
        <Field name="Filling" component="select">
          <option value="">Select One</option>
          {test}
        </Field>
        <Error name="Filling" />
      </div>
    );
  };

  const Topping = () => {
    let test = toppings.map((topping, index) => (
      <option key={index} value={topping}>
        {topping}
      </option>
    ));
    return (
      <div>
        <label>Topping</label>
        <Field name="Topping" component="select">
          <option value="">Select One</option>
          {test}
        </Field>
        <Error name="Topping" />
      </div>
    );
  };

  const FrostingFlavor = () => {
    let test = frostings.map((frosting, index) => (
      <option key={index} value={frosting.type}>
        {frosting.type}
      </option>
    ));
    return (
      <div>
        <label>Frosting Flavor</label>
        <Field name="FrostingFlavor" component="select">
          <option value="">Select One</option>
          {test}
        </Field>
        <Error name="FrostingFlavor" />
      </div>
    );
  };
  return (
    <Styles>
      <h1>Delicious N’ Sweet</h1>
      <h2>Cupcake Wizard Form</h2>
      <p>
        Please follow the steps in the wizard to build your perfect cupcake!
      </p>
      <Wizard initialValues={} onSubmit={onSubmit}>
        <Wizard.Page
          validate={(values) => {
            const errors = {};
            if (!values.Size) {
              errors.Size = 'Required';
            } else if (values.Size.length < 1) {
              errors.Size = 'Choose more';
            }
            return errors;
          }}
        >
          <Size />
        </Wizard.Page>
        <Wizard.Page
          validate={(values) => {
            const errors = {};
            if (!values.Flavor) {
              errors.Flavor = 'Required';
            } else if (values.Flavor.length < 1) {
              errors.Flavor = 'Choose more';
            }
            return errors;
          }}
        >
          <Flavors />
        </Wizard.Page>
        <Wizard.Page>
          <Filling />
        </Wizard.Page>
        <Wizard.Page>
          <Frosting />
        </Wizard.Page>
        <Wizard.Page>
          <Topping />
        </Wizard.Page>
        <Wizard.Page>
          <div>
            <label>Notes</label>
            <Field name="notes" component="textarea" placeholder="Notes" />
            <Error name="notes" />
          </div>
        </Wizard.Page>
      </Wizard>
    </Styles>
  );
}
