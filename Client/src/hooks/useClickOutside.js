import { useEffect, useRef } from 'react';

function useClickOutside(handler, exceptions = [], listenCapturing = true) {
	const ref = useRef();

	useEffect(() => {
		function handleClick(e) {
			if (
				ref.current &&
				!ref.current.contains(e.target) &&
				!exceptions.some((exc) => exc.current?.contains(e.target))
			) {
				handler();
			}
		}

		document.addEventListener('click', handleClick, listenCapturing);
		return () =>
			document.removeEventListener('click', handleClick, listenCapturing);
	}, [handler, exceptions, listenCapturing]);

	return ref;
}

export default useClickOutside;
