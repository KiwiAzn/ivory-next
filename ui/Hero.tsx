import { CreateDiceRoom } from './CreateDiceRoom';
import { HeroBackground } from './HeroBackground';

export const Hero: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0">
        <HeroBackground />
      </div>
      <div className="hero fixed inset-0">
        <div className="hero-content text-center">
          <div className="max-w-xl backdrop-blur-sm bg-neutral/50 p-8 rounded-lg shadow-2xl">
            <h1 className="font-hero text-9xl font-bold">Ivory</h1>
            <p className="py-6">RPG dice rolling app built for the web</p>
            <CreateDiceRoom />
          </div>
        </div>
      </div>
    </>
  );
};
