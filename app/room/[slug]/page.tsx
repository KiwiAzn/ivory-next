import { DiceRolls } from '@/ui/DiceRolls';
import { useStore } from '../../../lib/store';

//@ts-ignore
export default function Page({ params }) {
  return <DiceRolls channelSlug={params.slug} />;
}
