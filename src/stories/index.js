import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withBackgrounds from '@storybook/addon-backgrounds';
import Component from './Component'
import '../App.css'

import ButtonRadio, { Button } from '../components/ButtonRadio'
import Login from '../Login'
import TextInput from '../components/TextInput'
import Speedometer from '../components/Speedometer'

addDecorator(
  withBackgrounds([
    { name: 'Dark', value: 'rgb(32, 32, 32)', default: true }
  ])
);

storiesOf('Button Radio', module)
  .add('Default', () => (
    <Component defaultState={{value: 'day'}}>
      {
        ({state, setState}) => (
          <ButtonRadio
            buttons={[
              {value: 'year', label: 'Year'},
              {value: 'month', label: 'Month'},
              {value: 'day', label: 'Day'},
              {value: 'hour', label: 'Hour'},
            ]}
            onChange={value => {
              action('onChange')(value)
              setState({value})
            }}
            value={state.value}
          />
        )
      }
    </Component>
  ))

storiesOf('Button', module)
  .add('Default', () => (
    <Button>Default Button</Button>
  ))
  .add('Selected', () => (
    <Button selected={true}>Default Button</Button>
  ))

storiesOf('Login', module)
  .add('Default', () => (
    <Login />
  ))

storiesOf('TextInput', module)
  .add('Default', () => (
    <Component defaultState={{value: ""}}>
      {
        ({state, setState}) => (
          <TextInput label="Username" value={state.value} onChange={value => {setState({value})}} />
        )
      }
    </Component>
  ))

storiesOf('Speedometer', module)
  .add('Default', () => (
    <Speedometer/>
  ))
  .add('0/10', () => (
    <Speedometer current={0} total={10} />
  ))
  .add('5/10', () => (
    <Speedometer current={5} total={10} />
  ))
  .add('10/100', () => (
    <Speedometer current={10} total={100} />
  ))
  .add('100/100', () => (
    <Speedometer current={100} total={100} />
  ))
