'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Inputs {
  roomName: string;
}

export const CreateDiceRoom: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

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
