import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withBackgrounds from '@storybook/addon-backgrounds';
import Component from './Component'

import ButtonRadio, { Button } from '../components/ButtonRadio'

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
