'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { generateSlug } from 'random-word-slugs';

interface Inputs {
  roomName: string;
}

export const CreateDiceRoom: React.FC = () => {
  const slug = generateSlug(3, {
    format: 'camel',
  });

  const formattedSlug = slug[0].toUpperCase() + slug.slice(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      roomName: formattedSlug,
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const roomRoute = `/room/${data.roomName}`;
    router.push(roomRoute);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group">
        <input
          type="text"
          className="input-bordered input"
          {...register('roomName', { required: true })}
        />
        <button className="btn-primary btn-active btn">Create dice room</button>
      </div>
    </form>
  );
};
