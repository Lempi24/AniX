import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
	return (
		<div className='max-w-4xl mx-auto p-6 md:p-10  text-text-secondary leading-relaxed'>
			<h1 className='text-3xl font-bold mb-6 text-text-primary'>
				Regulamin Serwisu AniX
			</h1>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					1. Akceptacja Warunków
				</h2>
				<p>
					Korzystanie z serwisu "AniX" (dalej zwanego "Serwisem") jest
					równoznaczne z akceptacją niniejszego regulaminu. Jeśli nie zgadzasz
					się z poniższymi warunkami, prosimy o opuszczenie Serwisu.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					2. Opis Usługi
				</h2>
				<p className='font-bold text-lg mb-2'>Oświadczenie (Disclaimer)</p>
				<p className='mb-2'>
					Serwis AniX jest indeksem linków i materiałów wideo publicznie
					dostępnych w Internecie.{' '}
					<strong>
						Serwis nie hostuje, nie przechowuje ani nie udostępnia żadnych
						plików wideo na swoich serwerach.
					</strong>
				</p>
				<p>
					Wszystkie materiały, do których linkujemy, znajdują się na serwerach
					firm trzecich (np. CDA, VK, Sibnet). Działamy jedynie jako agregator,
					ułatwiając użytkownikom odnalezienie tych treści. Nie ponosimy
					odpowiedzialności za zawartość hostowaną na zewnętrznych serwerach.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					3. Konta Użytkowników
				</h2>
				<ul className='list-disc list-inside space-y-1 pl-4 mb-2'>
					<li>
						Użytkownik zobowiązany jest do podania prawdziwego adresu e-mail
						podczas rejestracji.
					</li>
					<li>
						Użytkownik ponosi pełną odpowiedzialność za bezpieczeństwo swojego
						hasła i konta.
					</li>
					<li>Zabronione jest udostępnianie swojego konta osobom trzecim.</li>
				</ul>
			</section>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					4. Zasady Korzystania z Serwisu
				</h2>
				<p className='mb-2'>Zabrania się:</p>
				<ul className='list-disc list-inside space-y-1 pl-4 mb-2'>
					<li>
						Publikowania treści obraźliwych, nielegalnych lub spamerskich (np. w
						przyszłych komentarzach).
					</li>
					<li>
						Podejmowania działań mających na celu destabilizację działania
						Serwisu.
					</li>
					<li>
						Automatycznego pobierania danych (scrapingu) bez zgody
						administratora.
					</li>
				</ul>
			</section>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					5. Prawa Autorskie
				</h2>
				<p>
					Szanujemy własność intelektualną. Jeśli uważasz, że Twoje prawa
					autorskie zostały naruszone, postępuj zgodnie z procedurą opisaną w
					naszej
					<Link to='/dmca' className='text-cta hover:underline'>
						Polityce DMCA
					</Link>
					.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					6. Zmiany w Regulaminie
				</h2>
				<p>
					Zastrzegamy sobie prawo do zmiany niniejszego regulaminu w dowolnym
					momencie. O wszelkich istotnych zmianach będziemy informować
					użytkowników.
				</p>
			</section>
		</div>
	);
};

export default TermsOfService;
