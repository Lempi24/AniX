import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import Menu from './Menu';
import useClickOutside from '../hooks/useClickOutside';
const Navigation = ({ onLoginClick }) => {
	const { isAuthenticated, logout, user, loading } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState([]);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const userMenuButtonRef = useRef();
	const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
	const dropdownRef = useClickOutside(() => {
		setIsDropdownVisible(false);
	}, []);
	const [isSearching, setIsSearching] = useState(false);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const userMenuRef = useClickOutside(
		() => setIsUserMenuOpen(false),
		[userMenuButtonRef]
	);
	useEffect(() => {
		setIsUserMenuOpen(false);
		setIsMobileMenuOpen(false);
	}, [location.pathname]);
	useEffect(() => {
		if (searchTerm.trim() === '') {
			setResults([]);
			setIsDropdownVisible(false);
			return;
		}

		setIsDropdownVisible(true);
		setIsSearching(true);
		const delayDebounceFn = setTimeout(async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/anime/search?q=${searchTerm}`
				);
				setResults(response.data);
			} catch (err) {
				console.error(err);
				setResults([]);
			} finally {
				setIsSearching(false);
			}
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);

	const handleResultClick = () => {
		setSearchTerm('');
		setResults([]);
		setIsDropdownVisible(false);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const activeLinkClass = 'border-b-2 border-cta pb-1';
	const inactiveLinkClass = '';
	const angleIcon =
		'M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z';
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
						{loading ? (
							<div className='w-10 h-10 rounded-full border-2 bg-main  animate-pulse'></div>
						) : isAuthenticated ? (
							<button
								ref={userMenuButtonRef}
								onClick={() => setIsUserMenuOpen((prev) => !prev)}
								className='w-10 overflow-hidden rounded-full cursor-pointer'
							>
								<img
									src={user?.avatar_url}
									alt='User avatar'
									className='w-full'
								/>
							</button>
						) : (
							<button
								onClick={onLoginClick}
								className='border-2 border-cta p-2 rounded-lg cursor-pointer transition-colors hover:bg-cta hover:text-main'
							>
								Logowanie
							</button>
						)}
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

			{isDropdownVisible && (
				<div ref={dropdownRef}>
					<Dropdown
						results={results}
						onResultClick={handleResultClick}
						isSearching={isSearching}
					/>
				</div>
			)}
			{isUserMenuOpen && (
				<div ref={userMenuRef}>
					<Menu
						user={user}
						onLogOut={logout}
						closeMenu={() => setIsUserMenuOpen(false)}
					/>
				</div>
			)}
			{isMobileMenuOpen && (
				<div>
					<ul className='lg:hidden absolute w-full bg-secondary border-b-3 border-cta p-4 space-y-4 z-10'>
						{user && (
							<div
								onClick={() => setIsMobileUserMenuOpen((prev) => !prev)}
								className='flex items-center gap-3'
							>
								<img
									src={user?.avatar_url}
									alt='Avatar'
									className='w-12 h-12 rounded-full border-2 border-cta'
								/>
								<div className='flex-1 min-w-0'>
									<p className='text-white font-semibold text-sm truncate'>
										{user?.username}
									</p>
									<p className='text-white/50 text-xs truncate'>
										{user?.email}
									</p>
								</div>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 640 640'
									className={`w-[25px] fill-cta transition-all duration-300 ${
										isMobileUserMenuOpen ? 'rotate-180' : 'rotate-0'
									}`}
								>
									<path d={angleIcon} />
								</svg>
							</div>
						)}
						{isMobileUserMenuOpen && (
							<div className='flex flex-col gap-3 bg-main/20 p-3 rounded-2xl'>
								<NavLink to='/profile' className=''>
									<span className='font-medium'>Profil</span>
								</NavLink>
								<NavLink to='/my-list' className=''>
									<span className='font-medium'>Lista anime</span>
								</NavLink>
								<NavLink to='/settings' className=''>
									<span className='font-medium'>Ustawienia</span>
								</NavLink>
							</div>
						)}
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
							{isAuthenticated ? (
								<button onClick={() => logout()} className='cursor-pointer'>
									Wyloguj
								</button>
							) : (
								<button onClick={onLoginClick} className='cursor-pointer'>
									Logowanie
								</button>
							)}
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default Navigation;
