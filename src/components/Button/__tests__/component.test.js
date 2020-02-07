import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react';
import Button from '../component'
import { SHAPE_ASYNC_STATUS_INITIAL } from '../../../constants';

it('renders welcome message', () => {
  const { getByText } = render(<Button asyncStatus={SHAPE_ASYNC_STATUS_INITIAL}>dfdf</Button>);
  expect(getByText('dfdf')).toBeInTheDocument();
});
