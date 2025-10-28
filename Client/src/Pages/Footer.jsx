import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className='bg-secondary text-text-secondary border-t-2 border-cta mt-20'>
			<div className='max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
				<div className='md:col-span-3 lg:col-span-2'>
					<h2 className='text-2xl font-bold text-cta'>AniX</h2>
					<p className='mt-4 text-sm leading-relaxed max-w-lg'>
						<strong>Oświadczenie (Disclaimer):</strong> Ta strona nie hostuje
						ani nie przechowuje żadnych plików na swoich serwerach. Jesteśmy
						jedynie indeksem linków publicznie dostępnych w Internecie. Wszelkie
						roszczenia dotyczące praw autorskich prosimy kierować do właścicieli
						serwisów hostingowych, na których znajdują się materiały.
					</p>
				</div>

				<div>
					<h4 className='text-lg font-semibold text-text-primary mb-4'>
						Nawigacja
					</h4>
					<ul className='space-y-3'>
						<li>
							<Link to='/' className='hover:text-cta transition-colors'>
								Strona główna
							</Link>
						</li>
						<li>
							<Link to='/anime' className='hover:text-cta transition-colors'>
								Anime
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<h4 className='text-lg font-semibold text-text-primary mb-4'>
						Informacje
					</h4>
					<ul className='space-y-3'>
						<li>
							<Link to='/dmca' className='hover:text-cta transition-colors'>
								DMCA
							</Link>
						</li>
						<li>
							<Link
								to='/privacy-policy'
								className='hover:text-cta transition-colors'
							>
								Polityka Prywatności
							</Link>
						</li>
						<li>
							<Link
								to='/terms-of-service'
								className='hover:text-cta transition-colors'
							>
								Regulamin
							</Link>
						</li>
						<li>
							<Link to='/contact' className='hover:text-cta transition-colors'>
								Kontakt
							</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className='bg-background/50 py-4'>
				<p className='text-center text-sm text-text-secondary'>
					© 2025 AniX. Wszelkie prawa zastrzeżone.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
