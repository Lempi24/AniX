import React from 'react';

const ContactPage = () => {
	// Wstaw tutaj ten sam e-mail, którego użyjesz w polityce DMCA
	const contactEmail = 'twoj-email@twoja-domena.com';

	return (
		<div className='max-w-4xl mx-auto p-6 md:p-10  text-text-secondary'>
			<h1 className='text-3xl font-bold mb-6 text-text-primary'>Kontakt</h1>

			<section className='mb-6'>
				<p className='text-lg leading-relaxed'>
					Masz pytania, sugestie, znalazłeś błąd na stronie lub chcesz zgłosić
					problem dotyczący praw autorskich?
				</p>
				<p className='text-lg mt-4'>
					Najszybszym sposobem na skontaktowanie się z nami jest wysłanie
					wiadomości e-mail na adres:
				</p>
				<a
					href={`mailto:${contactEmail}`}
					className='text-cta text-2xl font-bold hover:underline mt-2 inline-block'
				>
					{contactEmail}
				</a>
			</section>

			<section className='mt-10'>
				<p className='text-sm'>
					Odpowiemy tak szybko, jak to możliwe. Prosimy o cierpliwość.
				</p>
			</section>
		</div>
	);
};

export default ContactPage;
