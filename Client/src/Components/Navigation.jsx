import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import axios from 'axios';
const Navigation = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState([]);
	useEffect(() => {
		if (searchTerm.trim() === '') {
			setResults([]);
			return;
		}
		const delayDebounceFn = setTimeout(async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/anime/search?q=${searchTerm}`
				);
				setResults(response.data);
			} catch (err) {
				console.error(err);
			}
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);
	const handleResultClick = () => {
		setSearchTerm('');
		setResults([]);
	};
	const burgerMenuIcon =
		'M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z';
	return (
		<div className='relative'>
			<nav className='relative flex items-center justify-between  bg-secondary p-4 border-b-3 border-cta'>
				<h1
					onClick={() => navigate('/')}
					className='text-cta text-3xl mr-2 cursor-pointer'
				>
					AniX
				</h1>
				<input
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					type='text'
					placeholder='Wpisz tytuł...'
					className='lg:absolute  lg:left-1/2 lg:-translate-x-1/2 border-b-2 border-cta  py-2  placeholder:text-sm lg:w-1/4  focus:outline-0'
				/>
				<ul className='hidden  lg:flex items-center gap-8'>
					<li>
						<NavLink
							to='/'
							className={({ isActive }) => {
								return isActive ? 'border-b-2 border-cta pb-1' : '';
							}}
						>
							Strona główna
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/anime'
							className={({ isActive }) => {
								return isActive ? 'border-b-2 border-cta pb-1' : '';
							}}
						>
							Anime
						</NavLink>
					</li>
					<li>
						<a>Logowanie</a>
					</li>
				</ul>
				<button className='block lg:hidden'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 640 640'
						className='fill-cta w-[40px]'
					>
						<path d={burgerMenuIcon} />
					</svg>
				</button>
			</nav>
			{results.length > 0 && (
				<Dropdown results={results} onResultClick={handleResultClick} />
			)}
		</div>
	);
};
export default Navigation;
