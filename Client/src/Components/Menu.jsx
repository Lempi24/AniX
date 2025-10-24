import { NavLink } from 'react-router-dom';

const Menu = ({ user, onLogOut, closeMenu }) => {
	return (
		<div className='absolute top-20 right-0 z-100 bg-main rounded-2xl border-2 border-cta w-[280px] '>
			<div className='px-4 py-4 border-b border-cta/30 bg-cta/5'>
				<div className='flex items-center gap-3'>
					<img
						src={user?.avatar_url}
						alt='Avatar'
						className='w-12 h-12 rounded-full border-2 border-cta'
					/>
					<div className='flex-1 min-w-0'>
						<p className='text-white font-semibold text-sm truncate'>
							{user?.username}
						</p>
						<p className='text-white/50 text-xs truncate'>{user?.email}</p>
					</div>
				</div>
			</div>

			{/* Menu Items */}
			<ul className='py-2'>
				<li>
					<NavLink
						to='/profile'
						className='flex items-center px-4 py-3  hover:bg-cta/20 hover:text-cta transition-all duration-200 border-l-3 border-transparent hover:border-l-cta'
					>
						<span className='font-medium'>Profil</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/my-list'
						className='flex items-center px-4 py-3  hover:bg-cta/20 hover:text-cta transition-all duration-200 border-l-3 border-transparent hover:border-l-cta'
					>
						<span className='font-medium'>Lista anime</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/settings'
						className='flex items-center px-4 py-3  hover:bg-cta/20 hover:text-cta transition-all duration-200 border-l-3 border-transparent hover:border-l-cta'
					>
						<span className='font-medium'>Ustawienia</span>
					</NavLink>
				</li>
			</ul>

			<div className='h-px bg-cta/20 mx-3'></div>

			<ul className='py-2'>
				<li>
					<button
						onClick={() => {
							onLogOut(), closeMenu();
						}}
						className='w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-red-500/15 hover:text-red-400 transition-all duration-200 border-l-3 border-transparent hover:border-l-red-400 cursor-pointer'
					>
						<span className='font-medium'>Wyloguj się</span>
					</button>
				</li>
			</ul>
		</div>
	);
};
export default Menu;
