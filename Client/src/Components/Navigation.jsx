const Navigation = () => {
	const burgerMenuIcon =
		'M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z';
	return (
		<nav className='relative flex items-center justify-between  bg-secondary p-4 border-b-3 border-cta'>
			<h1 className='text-cta text-3xl mr-2'>AniX</h1>
			<input
				type='text'
				placeholder='Wpisz tytuł...'
				className='lg:absolute  lg:left-1/2 lg:-translate-x-1/2 border-2 border-cta p-2 rounded-4xl bg-accent placeholder:text-secondary placeholder:text-sm lg:w-1/4 w-3/4'
			/>
			<ul className='hidden  lg:flex items-center gap-8'>
				<li>
					<a>Strona główna</a>
				</li>
				<li>
					<a>Anime</a>
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
	);
};
export default Navigation;
