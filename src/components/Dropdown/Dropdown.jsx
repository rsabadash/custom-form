import React, { useState } from 'react';

const Dropdown = (
	{
		title,
		items,
		multiSelect,
		onChange,
		name
	}
) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selection, setSelection] = useState([]);
	
	const toggle = () => {
		setIsOpen(!isOpen);
	};
	
	const handleOnClick = (event, item) => {
		if (!selection.some((current) => current.id === item.id)) {
			if (!multiSelect) {
				setSelection([item]);
			} else if (multiSelect) {
				setSelection([...selection, item]);
			}
			
			onChange && onChange(event, item.id);
		} else {
			const selectionAfterRemoval = selection.filter((current) => current.id !== item.id);
			setSelection([...selectionAfterRemoval]);
		}
		
		setIsOpen(false);
	};
	
	const isItemSelected = (item) => {
		return !!selection.find((current) => current.id === item.id);
	};
	
	const formattedValue = selection[0] && selection[0].id || '';
	
	return (
		<>
			<div>
				<div
					role="button"
					tabIndex={0}
					onClick={toggle}
					onKeyPress={toggle}
				>
					<div>
						<p>{(selection[0] && selection[0].value) || title}</p>
					</div>
					<div>
						{
							isOpen ? 'Close' : 'Open'
						}
					</div>
				</div>
				{
					isOpen && (
						<ul>
							{
								items.map((item) => {
									return (
										<li
											key={item.id}
										>
											<button
												type="button"
												onClick={(event) => handleOnClick(event, item)}
											>
												<span>{item.value}</span>
												{
													isItemSelected(item) && (
														<span>Selected</span>
													)
												}
											</button>
										</li>
									)
								})
							}
						</ul>
					)
				}
			</div>
			<input type="hidden" value={formattedValue} name={name} />
		</>
	);
};

export { Dropdown };