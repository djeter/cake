import React, { useState, useRef } from 'react';
import '../style.css';
import Styles from '../Styles';
import { Form, Field } from 'react-final-form';
import Wizard from './Wizard';
import createDecorator from 'final-form-calculate';
import { sizes, flavors, fillings, frostings, toppings } from '../data.js';
import NumberFormat from 'react-number-format';
import Size from '../components/Size'
import Flavors from '../components/Flavors'
import Frosting from '../components/Frosting'
import Filling from '../components/Filling'
import FrostingFlavors from '../components/FrostingFlavors'
import FillingFlavors from '../components/FillingFlavors'
import Topping from '../components/Topping'

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
export default function Calculator() {
  const curSize = useRef();
  const curTopping = useRef();
  const curFilling = useRef();
  const curFrosting = useRef();
  const curFillingFlavor = useRef();
  const curFrostingFlavor = useRef();
  const curTotal = useRef();
  const submitButton = useRef();

const updatePrice = () => {

  let newTotal =
  parseInt(
    curTopping.current.options[
      curTopping.current.selectedIndex
    ].dataset.price
      ? toppings[curTopping.current.selectedIndex - 1].price
      : 0
  ) +
  parseInt(
    curSize.current.options[curSize.current.selectedIndex]
      .dataset.price
      ? sizes[curSize.current.selectedIndex - 1].price
      : 0
  ) +
  parseInt(
    curFilling.current.options[
      curFilling.current.selectedIndex
    ].dataset.price
      ? fillings[curFilling.current.selectedIndex - 1].price
      : 0
  );
curTotal.current.setAttribute('value', newTotal);
curTotal.current.dispatchEvent(
  new Event('change', { bubbles: true })
);
}




  const required = value => (value ? undefined : 'Required')
  const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
  const minValue = min => value =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
  const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)
  return (
    <Styles>
      <h1>Delicious N’ Sweet</h1>
      <h2>Cupcake Wizard Form</h2>
      <p>
        Please follow the steps in the wizard to build your perfect cupcake!
      </p>
      <Form
        initialValues={}
        validate={(foo) => console.log('validating', foo)}
        onSubmit={onSubmit}
        render={({
          handleSubmit,
          form,
          reset,
          submitting,
          pristine,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Size updatePrice={updatePrice} curSize={curSize} Error={Error} required={required}/>
            <Flavors updatePrice={updatePrice} Error={Error} required={required} curFrosting={curFrosting} />
            <div>
            <Filling updatePrice={updatePrice} curFilling={curFilling} Error={Error}/>
            {values.Filling ? <FillingFlavors  Error={Error}  idx={curFilling.current.selectedIndex} curFilling={curFilling} curFillingFlavor={curFillingFlavor}/> : null}
            </div>
            <div>
            <Frosting  Error={Error} curFrosting={curFrosting} curFrostingFlavor={curFrostingFlavor} updatePrice={updatePrice}/>
            {values.Frosting ? <FrostingFlavors  Error={Error}  idx={curFrosting.current.selectedIndex} curFrosting={curFrosting} curFrostingFlavor={curFrostingFlavor}/> : null}
            </div>
            <Topping updatePrice={updatePrice} curTopping={curTopping} Error={Error}/>
            <div>
              <label>Notes</label>
              <Field name="notes" component="textarea" placeholder="Notes" />
              <Field
                name="total"
                component="input"
                placeholder="stuff"
                ref={curTotal}
                style={{ display: 'none' }}
              />
              <Error name="notes" />
            </div>
              <hr/>
              {values.Size &&
              <div >
              <label>How many < strong>{values.Size}</strong> would you like?</label>
              <Field
                name='Quantity_In_Order'
                component="input"
                type="number"
                validate={composeValidators(required, mustBeNumber, minValue(1))}
              />
              </div>
              }
            <div className="buttons">
              <button type="submit" disabled={submitting} ref={submitButton}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <hr/>
            <div style={{flexDirection:'column', alignItems: 'flex-end'}}>
            {values.Size&&<div><strong>Number of Cup Cakes: </strong>{values.Size}</div>}
            {values.Flavor&&<div><strong>Flavor: </strong>{values.Flavor}</div>}
            {values.Filling&&<div><strong>Filling: </strong>{values.Filling}{values.Filling_Flavors ? <strong> ({values.Filling_Flavors})</strong>: null}</div>}
            {values.Frosting&&<div><strong>Frosting: </strong>{values.Frosting}{values.Frosting_Flavors ? <strong> ({values.Frosting_Flavors})</strong>: null}</div>}
            {values.Topping&&<div><strong>Topping: </strong>{values.Topping}</div>}
            {values.notes&&<div><strong>Notes: </strong>{values.notes}</div>}
            {values.Quantity_In_Order >= 1 &&<div><strong>Quantity in order: </strong>{values.Quantity_In_Order}</div>}
            {values.Quantity_In_Order > 0 && <div><strong>Total: </strong>${(Math.round((values.total * values.Quantity_In_Order) * 100) / 100).toFixed(2)}</div>}
            </div>
          </form>
        )}
      />
    </Styles>
  );
}
