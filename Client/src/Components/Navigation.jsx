import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import axios from 'axios';

const Navigation = ({ onLoginClick }) => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState([]);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const activeLinkClass = 'border-b-2 border-cta pb-1';
	const inactiveLinkClass = '';

	return (
		<div className='relative'>
			<nav className='relative flex items-center justify-between bg-secondary p-4 border-b-3 border-cta z-20'>
				<h1
					onClick={() => navigate('/')}
					className='text-cta text-3xl mr-2 cursor-pointer'
				>
					AniX
				</h1>
				<div className='lg:absolute lg:left-1/2 lg:-translate-x-1/2 w-2/5'>
					<input
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						type='text'
						placeholder='Wpisz tytuł...'
						className='w-full border-b-2 border-cta py-2 placeholder:text-sm focus:outline-0'
					/>
				</div>
				<ul className='hidden lg:flex items-center gap-8'>
					<li>
						<NavLink
							to='/'
							className={({ isActive }) =>
								isActive ? activeLinkClass : inactiveLinkClass
							}
						>
							Strona główna
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/anime'
							className={({ isActive }) =>
								isActive ? activeLinkClass : inactiveLinkClass
							}
						>
							Anime
						</NavLink>
					</li>
					<li>
						<button onClick={onLoginClick} className='cursor-pointer'>
							Logowanie
						</button>
					</li>
				</ul>
				<button
					onClick={toggleMobileMenu}
					className='block lg:hidden w-8 h-8 relative focus:outline-none'
				>
					<span
						className={`absolute block w-full h-0.5 bg-cta transition-all duration-300 ease-in-out ${
							isMobileMenuOpen
								? 'top-1/2 -translate-y-1/2 rotate-45'
								: 'top-1/5'
						}`}
					></span>
					<span
						className={`absolute block w-full h-0.5 bg-cta transition-all duration-300 ease-in-out ${
							isMobileMenuOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'
						}`}
					></span>
					<span
						className={`absolute block w-full h-0.5 bg-cta transition-all duration-300 ease-in-out ${
							isMobileMenuOpen
								? 'top-1/2 -translate-y-1/2 -rotate-45'
								: 'top-3/4'
						}`}
					></span>
				</button>
			</nav>

			{results.length > 0 && (
				<Dropdown results={results} onResultClick={handleResultClick} />
			)}

			{isMobileMenuOpen && (
				<ul className='lg:hidden absolute w-full bg-secondary border-b-3 border-cta p-4 space-y-4 z-10'>
					<li>
						<NavLink
							to='/'
							onClick={toggleMobileMenu}
							className={({ isActive }) => (isActive ? 'text-cta' : '')}
						>
							Strona główna
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/anime'
							onClick={toggleMobileMenu}
							className={({ isActive }) => (isActive ? 'text-cta' : '')}
						>
							Anime
						</NavLink>
					</li>
					<li>
						<button onClick={onLoginClick} className='cursor-pointer'>
							Logowanie
						</button>
					</li>
				</ul>
			)}
		</div>
	);
};

export default Navigation;
