import React, { useState } from 'react';

const Dropdown = (
	{
		title,
		items,
		multiSelect,
		onChange,
		name,
		ariaLabeledBy
	}
) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selection, setSelection] = useState([]);
	
	const toggle = () => {
		setIsOpen(!isOpen);
	};
	
	const checkIsItemSelected = (id) => {
		return !!selection.find((current) => current.id === id);
	};
	
	const uncheckSelectedValue = (id) => {
		return selection.filter((current) => current.id !== id);
	};
	
	const getMultipleValue = () => {
		return selection.reduce((acc, item, index) => {
			if (index === 0) {
				acc = `${item.value}`;
			} else {
				acc = `${acc} | ${item.value}`;
			}
			
			return acc;
		}, '');
	};
	
	const getSingleValue = () => {
		return (selection[0] && selection[0].value) || '';
	};
	
	const getFormattedValue = () => {
		return multiSelect ? getMultipleValue() : getSingleValue();
	};
	
	const getMultipleId = () => {
		return selection.reduce((acc, item) => {
			acc.push(item.id);

			return acc;
		}, []);
	};
	
	const getSingleId = () => {
		return (selection[0] && selection[0].id) || '';
	};
	
	const getFormattedId = () => {
		return multiSelect ? getMultipleId() : getSingleId();
	};
	
	const handleOnClick = (event, item) => {
		const isItemAlreadySelected = checkIsItemSelected(item.id);
		
		if (!isItemAlreadySelected) {
			if (multiSelect) {
				setSelection([...selection, item]);
			} else {
				setSelection([item]);
			}
		}
		
		if (isItemAlreadySelected && multiSelect) {
			const selectionAfterRemoval = uncheckSelectedValue(item.id);
			setSelection([...selectionAfterRemoval]);
		}
		
		const value = getFormattedId();
		
		onChange && onChange(event, value);

		setIsOpen(false);
	};
	
	const formattedInputValue = getFormattedId();
	const formattedDropdownValue = getFormattedValue();
	
	return (
		<>
			<div>
				<div
					role="button"
					tabIndex={0}
					aria-haspopup="listbox"
					aria-labelledby={ariaLabeledBy}
					aria-expanded={isOpen}
					onClick={toggle}
					onKeyPress={toggle}
				>
					<div>
						<p>{formattedDropdownValue || title}</p>
					</div>
					<div>
						{
							isOpen ? 'Close' : 'Open'
						}
					</div>
				</div>
				{
					isOpen && (
						<ul
							role="listbox"
							tabIndex={-1}
							aria-multiselectable={multiSelect}
							aria-labelledby={ariaLabeledBy}
							// aria-activedescendant - when element is active
						>
							{
								items.map((item) => {
									const { id, value } = item;
									const isItemSelected = checkIsItemSelected(id);
									return (
										<li
											aria-selected={isItemSelected}
											role="option"
											id={id}
											key={id}
										>
											<button
												type="button"
												onClick={(event) => handleOnClick(event, item)}
											>
												<span>{value}</span>
												{
													isItemSelected && <span>Selected</span>
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
			<input type="hidden" value={formattedInputValue} name={name} />
		</>
	);
};

export { Dropdown };