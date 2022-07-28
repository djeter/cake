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
const size = ['Dozen (12)', 'Half Dozen (6)'];

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
      <Field name="Frosting" component="select" onchange={alert('changed')}>
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
        {test}
      </Field>
      <Error name="FrostingFlavor" />
    </div>
  );
};
export default function App() {
  return (
    <Styles>
      <h1>🏁 React Final Form Example</h1>
      <h2>Wizard Form</h2>
      <a href="https://github.com/erikras/react-final-form#-react-final-form">
        Read Docs
      </a>
      <p>
        Notice the mixture of field-level and record-level (or{' '}
        <em>page-level</em> in this case) validation.
      </p>
      <Wizard initialValues={{}} onSubmit={onSubmit}>
        <Wizard.Page>
          <Flavors />
        </Wizard.Page>
        <Wizard.Page>
          <Frosting />
        </Wizard.Page>
        <Wizard.Page
          validate={(values) => {
            const errors = {};
            if (!values.toppings) {
              errors.toppings = 'Required';
            } else if (values.toppings.length < 2) {
              errors.toppings = 'Choose more';
            }
            return errors;
          }}
        >
          <div>
            <label>Employed?</label>
            <Field name="employed" component="input" type="checkbox" />
          </div>
          <div>
            <label>Toppings</label>
            <Field name="toppings" component="select" multiple>
              <option value="ham">🐷 Ham</option>
              <option value="mushrooms">🍄 Mushrooms</option>
              <option value="cheese">🧀 Cheese</option>
              <option value="chicken">🐓 Chicken</option>
              <option value="pineapple">🍍 Pinapple</option>
            </Field>
            <Error name="toppings" />
          </div>
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
            <label>Best Stooge?</label>
            <div>
              <label>
                <Field
                  name="stooge"
                  component="input"
                  type="radio"
                  value="larry"
                />{' '}
                Larry
              </label>
              <label>
                <Field
                  name="stooge"
                  component="input"
                  type="radio"
                  value="moe"
                />{' '}
                Moe
              </label>
              <label>
                <Field
                  name="stooge"
                  component="input"
                  type="radio"
                  value="curly"
                />{' '}
                Curly
              </label>
            </div>
          </div>
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
