import { Link } from 'react-router-dom';

const Breadcrumbs = ({ animeId, title, episodeNumber }) => {
	return (
		<ul className='flex items-center space-x-2 p-5'>
			<li>
				<Link to={`/anime`} className='text-cta'>
					Anime
				</Link>
			</li>
			<li>{'>'}</li>
			<li>
				<Link to={`/anime/${animeId}`} className='text-cta'>
					{title}
				</Link>
			</li>
			<li>{'>'}</li>
			{episodeNumber && <li>Odcinek {episodeNumber}</li>}
		</ul>
	);
};
export default Breadcrumbs;
