import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {test} from './test';

const meta: Meta<typeof test> = {
  component: test,
};

export default meta;

type Story = StoryObj<typeof test>;

export const Basic: Story = {args: {}};
