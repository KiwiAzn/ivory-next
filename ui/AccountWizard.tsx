'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const AccountWizard: React.FC = () => {
  return <InitialPage />;
};

const InitialPage: React.FC = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          {/* <div className="divider">Or</div> */}
          <ContinueAsGuest />
        </div>
      </div>
    </div>
  );
};

interface Inputs {
  displayName: string;
}

const createGuestAccount = async (displayName: string) => {
  return axios.post('/api/guest-account', { displayName });
};

const ContinueAsGuest: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ displayName }) => {
    try {
      await createGuestAccount(displayName);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            className={classNames('input input-bordered', {
              'input-error': errors.displayName,
            })}
            placeholder="Name"
            {...register('displayName', { required: true })}
          />
          <button className="btn-primary btn-active btn">
            Continue as Guest
          </button>
        </div>
        <label className="label">
          <span className="label-text text-error" style={{ minHeight: 20 }}>
            {errors.displayName && 'Enter a name'}
          </span>
        </label>
      </div>
    </form>
  );
};
