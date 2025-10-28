const Dmca = () => {
	const contactEmail = 'twoj-email@twoja-domena.com';

	return (
		<div className='max-w-4xl mx-auto p-6 md:p-10  text-text-secondary leading-relaxed'>
			<h1 className='text-3xl font-bold mb-6 text-text-primary'>
				Copyright Policy (DMCA)
			</h1>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					Our Commitment
				</h2>
				<p>
					<strong>AniX</strong> ("we", "us", "our") respects the intellectual
					property of others and expects users of our service to do the same. In
					accordance with the Digital Millennium Copyright Act ("DMCA"), we will
					respond promptly to notices of alleged copyright infringement that are
					reported to us.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					Disclaimer
				</h2>
				<p className='mb-2'>
					<strong>AniX</strong> is an index of links to content publicly
					available on the Internet.{' '}
					<strong>
						We do not host or store any video or media files on our servers.
					</strong>{' '}
					All content we link to is located on third-party servers (e.g., CDA,
					VK, Sibnet, etc.) over which we have no control. We act solely as a
					search engine and aggregator, helping users find content that is
					already available elsewhere.
				</p>
				<p>
					If your copyrighted content has been published on one of these
					third-party sites, we believe the best course of action is to contact
					the administrator of that hosting service directly to have the content
					removed.
				</p>
				<p className='mt-2'>
					However, we will also remove links from our website upon request from
					a copyright owner.
				</p>
			</section>

			<section className='mb-6'>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					Notice and Takedown Procedure
				</h2>
				<p className='mb-4'>
					If you are a copyright owner (or are authorized to act on behalf of
					one) and you believe that any content linked to on our site infringes
					upon your copyright, you may submit a DMCA notification to our
					Copyright Agent.
				</p>
				<p className='mb-4'>
					To be valid, the notification must include the following elements:
				</p>
				<ol className='list-decimal list-inside space-y-2 mb-4 pl-4'>
					<li>
						An electronic or physical signature of the person authorized to act
						on behalf of the owner (the "Complainant") of the copyright interest
						that has allegedly been infringed.
					</li>
					<li>
						A description of the copyrighted work that the Complainant claims
						has been infringed.
					</li>
					<li>
						A description of where the infringing material is located on our
						Site, with enough detail that we may find it (e.g., the full URL on{' '}
						<strong>AniX</strong> leading to the material).
					</li>
					<li>
						The Complainant's name, address, telephone number, and email
						address.
					</li>
					<li>
						A statement by the Complainant that you have a good faith belief
						that the disputed use of the material is not authorized by the
						copyright owner, its agent, or the law.
					</li>
					<li>
						A statement by the Complainant, made under penalty of perjury, that
						the information provided in the notice is accurate and that the
						Complainant is the copyright owner or is authorized to act on the
						copyright owner's behalf.
					</li>
				</ol>

				<h3 className='text-xl font-semibold mb-2 text-text-primary'>
					Designated Copyright Agent
				</h3>
				<p className='mb-4'>
					All DMCA notices should be sent to our designated Copyright Agent via
					email:
					<br />
					<a
						href={`mailto:${contactEmail}`}
						className='font-bold text-cta hover:underline'
					>
						{contactEmail}
					</a>
				</p>

				<h3 className='text-xl font-semibold mb-2 text-text-primary'>
					Upon Receipt of a Valid Notice
				</h3>
				<p className='mb-4'>
					Once a valid DMCA notification is received, <strong>AniX</strong> will
					take the following steps:
				</p>
				<ol className='list-decimal list-inside space-y-2 mb-4 pl-4'>
					<li>
						Promptly remove or disable access to the link or material claiming
						to be infringing.
					</li>
					<li>
						If the content was posted by a registered Member (if applicable), we
						will notify the Member that the material has been removed or access
						to it has been disabled.
					</li>
				</ol>
				<p className='text-sm italic'>
					*Please note: Due to the volume of complaints received, you may not
					receive a direct reply or update from us unless we require additional
					information.*
				</p>
			</section>

			<section>
				<h2 className='text-2xl font-semibold mb-3 text-text-primary'>
					Repeat Infringer Policy
				</h2>
				<p>
					In accordance with the DMCA, we have adopted a policy of terminating,
					in appropriate circumstances and at our sole discretion, Members who
					are deemed to be repeat copyright infringers. We may also, at our sole
					discretion, limit access to the Site and/or terminate the account of
					any Member who infringes upon any intellectual property rights of
					others, whether or not there is any repeat infringement.
				</p>
			</section>
		</div>
	);
};
export default Dmca;
