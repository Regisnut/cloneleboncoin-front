import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Pagination({ count, data, setData, fetchData, setIsLoading, setPage, page }) {
	const totalPages = Math.ceil(count / 3);

	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(
			<div key={i} className={Number(page) === i ? 'selected' : 'unselected'}>
				<span
					onClick={(event) => {
						event.preventDefault();
						setPage(i);
					}}
				>
					{i}
				</span>
			</div>
		);
	}

	return (
		<div className="PaginationContainer">
			<FontAwesomeIcon
				className="iconChevron"
				icon="chevron-left"
				onClick={() => {
					page > 1 && setPage(page - 1);
				}}
			/>
			{pageNumbers}
			<FontAwesomeIcon
				className="iconChevron"
				icon="chevron-right"
				onClick={() => {
					page < totalPages && setPage(page + 1);
				}}
			/>
		</div>
	);
}

export default Pagination;
