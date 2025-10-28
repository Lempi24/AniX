import React from 'react';

const PrivacyPolicy = () => {
	return (
		<div className='max-w-4xl mx-auto p-6 md:p-10 text-text-secondary leading-relaxed'>
			<h1 className='text-3xl font-bold mb-6 text-text-primary'>
				Polityka Prywatności
			</h1>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					1. Wprowadzenie
				</h2>
				<p>
					Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony
					danych osobowych użytkowników serwisu "AniX" (dalej zwanego
					"Serwisem"). Dbamy o Twoją prywatność i bezpieczeństwo Twoich danych.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					2. Administrator Danych
				</h2>
				<p>
					Administratorem Twoich danych osobowych jest zespół "AniX". W sprawach
					dotyczących przetwarzania danych możesz skontaktować się z nami pod
					adresem e-mail podanym na stronie kontaktowej.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					3. Jakie dane zbieramy?
				</h2>
				<p className='mb-2'>
					Podczas rejestracji w Serwisie prosimy Cię o podanie:
				</p>
				<ul className='list-disc list-inside space-y-1 pl-4 mb-2'>
					<li>Nazwy użytkownika (login)</li>
					<li>Adresu e-mail</li>
					<li>Hasła (przechowywanego w formie zaszyfrowanej - "hash")</li>
				</ul>
				<p>
					Podczas korzystania z serwisu automatycznie zbieramy informacje o
					Twojej aktywności, takie jak dodawanie anime do list (np. "Oglądam",
					"Ukończone") oraz Twoje oceny.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					4. W jakim celu używamy Twoich danych?
				</h2>
				<p className='mb-2'>Twoje dane są nam potrzebne, aby:</p>
				<ul className='list-disc list-inside space-y-1 pl-4 mb-2'>
					<li>Umożliwić Ci logowanie się i korzystanie z funkcji Serwisu.</li>
					<li>Personalizować treści (np. pokazywać Twoje listy anime).</li>
					<li>Zapewnić bezpieczeństwo Twojego konta i Serwisu.</li>
				</ul>
				<p>
					Nie sprzedajemy ani nie udostępniamy Twoich danych osobowych podmiotom
					trzecim w celach marketingowych.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					5. Ciasteczka (Cookies) i Pamięć Lokalna
				</h2>
				<p>
					Używamy pamięci lokalnej przeglądarki (`localStorage`) do
					przechowywania Twojego tokena sesji (JWT). Jest to niezbędne do
					utrzymania Twojego zalogowania. Nie używamy śledzących plików cookie
					stron trzecich.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					6. Twoje Prawa
				</h2>
				<p>
					Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia lub
					ograniczenia przetwarzania. Możesz w dowolnym momencie usunąć swoje
					konto, co spowoduje trwałe usunięcie powiązanych z nim danych.
				</p>
			</section>
		</div>
	);
};

export default PrivacyPolicy;
