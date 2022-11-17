import { DiceRolls } from '@/ui/DiceRolls';
import { RollDice } from '@/ui/RollDice';

//@ts-ignore
export default function Page({ params }) {
  return (
    <>
      <DiceRolls channelSlug={params.slug} />
      <RollDice channelSlug={params.slug} />
    </>
  );
}
