import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../Context/AuthContext';
const LoginPopup = ({ isOpen, onClose }) => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();
	const { login } = useAuth();
	const [isLoging, setIsLoging] = useState(true);
	const [loading, setLoading] = useState(false);
	const closeIcon =
		'M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z';

	const onLoginSubmit = async (data) => {
		setLoading(true);
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/auth/login`,
				data,
				{ headers: { 'Content-Type': 'application/json' } }
			);
			if (response.status === 200) {
				login(response.data.token, response.data.user);
				onClose();
				reset();
				toast.success(`Witaj ${response.data.user.username}!`);
			}
		} catch (error) {
			toast.error(error.response?.data?.error || 'Coś poszło nie tak.');
		} finally {
			setLoading(false);
		}
	};
	const onRegisterSubmit = async (data) => {
		setLoading(true);
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/auth/register`,
				data,
				{ headers: { 'Content-Type': 'application/json' } }
			);
			toast.success(response.data.message || 'Rejestracja powiodła się!');
			setIsLoging(true);
			reset();
		} catch (error) {
			toast.error(error.response?.data?.error || 'Coś poszło nie tak.');
		} finally {
			setLoading(false);
		}
	};

	const password = watch('password');

	if (!isOpen) return null;
	return (
		<div
			onClick={onClose}
			className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className='relative bg-main rounded-lg shadow-lg p-6 w-9/10 border-2 border-cta flex flex-col items-center gap-5 max-w-md'
			>
				<button
					onClick={onClose}
					className='border rounded-full p-1 ml-auto border-cta cursor-pointer'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 640 640'
						className='w-5 fill-text-accent'
					>
						<path d={closeIcon} />
					</svg>
				</button>
				<h1 className='text-3xl text-cta font-bold'>AniX</h1>
				<div className='p-2 bg-secondary rounded-2xl flex items-center justify-around w-full'>
					<button
						onClick={() => {
							setIsLoging(true);
							reset();
						}}
						className={`p-2 font-bold rounded-xl cursor-pointer w-1/2 ${
							isLoging ? 'bg-cta/30 text-cta' : ''
						}`}
					>
						Logowanie
					</button>
					<button
						onClick={() => {
							setIsLoging(false);
							reset();
						}}
						className={`p-2 font-bold rounded-xl cursor-pointer w-1/2 ${
							isLoging ? '' : 'bg-cta/30 text-cta'
						}`}
					>
						Rejestracja
					</button>
				</div>
				{isLoging ? (
					<form
						onSubmit={handleSubmit(onLoginSubmit)}
						className='relative flex flex-col gap-5'
						noValidate
					>
						<div>
							<label htmlFor='' className='text-sm'>
								Email lub nazwa użytkownika
							</label>
							<input
								{...register('username', { required: 'To pole jest wymagane' })}
								type='text'
								placeholder='Wprowadź email lub nick'
								className='bg-secondary rounded-xl p-3 w-full mt-2 border-2 border-cta focus:outline-0'
							/>
							{errors.username && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.username.message}
								</p>
							)}
						</div>
						<div>
							<label htmlFor='' className='text-sm'>
								Hasło
							</label>
							<input
								{...register('password', { required: 'Podaj hasło' })}
								type='password'
								placeholder='Wprowadź hasło'
								className='bg-secondary rounded-xl p-3 w-full mt-2 border-2 border-cta focus:outline-0'
							/>
							{errors.password && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.password.message}
								</p>
							)}
						</div>
						<button className='ml-auto text-sm'>Zapomniałeś hasła?</button>
						<button
							type='submit'
							className='bg-cta p-3 rounded-xl font-bold cursor-pointer'
						>
							Zaloguj się
						</button>
					</form>
				) : (
					<form
						onSubmit={handleSubmit(onRegisterSubmit)}
						className='relative flex flex-col gap-5'
						noValidate
					>
						<div>
							<label className='text-sm'>Nazwa użytkownika</label>
							<input
								{...register('username', { required: 'To pole jest wymagane' })}
								type='text'
								placeholder='Wybierz nick'
								className='bg-secondary rounded-xl p-3 w-full mt-2 border-2 border-cta focus:outline-0'
							/>
							{errors.username && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.username.message}
								</p>
							)}
						</div>

						<div>
							<label className='text-sm'>Email</label>
							<input
								{...register('email', {
									required: 'Email jest wymagany',
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: 'Nieprawidłowy format adresu email',
									},
								})}
								type='email'
								placeholder='twoj@email.com'
								className='bg-secondary rounded-xl p-3 w-full mt-2 border-2 border-cta focus:outline-0'
							/>
							{errors.email && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.email.message}
								</p>
							)}
						</div>
						<div>
							<label htmlFor='' className='text-sm'>
								Hasło
							</label>
							<input
								{...register('password', { required: 'Podaj hasło' })}
								type='password'
								placeholder='Min. 8 znaków'
								className='bg-secondary rounded-xl p-3 w-full mt-2 border-2 border-cta focus:outline-0'
							/>
							{errors.password && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.password.message}
								</p>
							)}
						</div>
						<div>
							<label htmlFor='' className='text-sm'>
								Powtórz hasło
							</label>
							<input
								{...register('confirmPassword', {
									required: 'Powtórz hasło',
									validate: (value) =>
										value === password || 'Hasła muszą być identyczne',
								})}
								type='password'
								placeholder='Powtórz hasło'
								className='bg-secondary rounded-xl p-3 w-full mt-2 border-2 border-cta focus:outline-0'
							/>
							{errors.confirmPassword && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.confirmPassword.message}
								</p>
							)}
						</div>
						<button
							type='submit'
							className='bg-cta p-3 rounded-xl font-bold cursor-pointer'
						>
							Zarejestruj się
						</button>
					</form>
				)}
				{loading && (
					<div className='absolute flex items-center justify-center w-full h-full top-0 backdrop-blur-[2px]'>
						<div className='w-6 h-6 border-4 border-cta border-t-transparent rounded-full animate-spin'></div>
					</div>
				)}
			</div>
		</div>
	);
};
export default LoginPopup;
