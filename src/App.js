import React from 'react';
import './style.css';
import Styles from './Styles';
import { Field } from 'react-final-form';
import Wizard from './Wizard';

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
const filling = [
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
const sizes = ['Dozen (12)', 'Half Dozen (6)'];

const Size = () => {
  let test = sizes.map((size, index) => (
    <option key={index} value={size}>
      {size}
    </option>
  ));
  return (
    <div>
      <label>Size</label>
      <Field name="Size" component="select">
        <option value="">Select One</option>
        {test}
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
export default function App() {
  return (
    <Styles>
      <h1>Delicious N’ Sweet</h1>
      <h2>Cupcake Wizard Form</h2>
      <p>
        Please follow the steps in the wizard to build your perfect cupcake!
      </p>
      <Wizard initialValues={{}} onSubmit={onSubmit}>
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
          <Frosting />
        </Wizard.Page>
        <Wizard.Page
          validate={(values) => {
            const errors = {};
            if (!values.notes) {
              errors.notes = 'Required';
            }
            return errors;
          }}
        >
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
