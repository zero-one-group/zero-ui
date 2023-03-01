import { addParameters } from '@storybook/react';
import { darkTheme } from '@zog-ui/core';
import React from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import badgeParameter from './parameter';
// Register extra parameters
addParameters(badgeParameter);

export const parameters = {
  layout: 'padded',
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    // https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy
    storySort: {
      order: [
        'Introduction',
        'Getting Started',
        'Server Side Rendering',
        'Foundations',
        'Components',
        '*',
      ],
    },
  },
  controls: {
    hideNoControlsWarning: true,
    sort: 'requiredFirst',
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    const theme = useDarkMode() ? darkTheme : '';

    return React.createElement('div', {
      className: theme,
      children: React.createElement(Story),
    });
  },
];
