import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DiceRoll } from './DiceRoll';

export default {
  component: DiceRoll,
  args: {
    total: 6,
    notation: '3d6',
    breakdown: '[2,1,3]',
  },
} as ComponentMeta<typeof DiceRoll>;

export const Playground: ComponentStory<typeof DiceRoll> = (args) => (
  <DiceRoll {...args} />
);
