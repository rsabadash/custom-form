import React, { useRef, useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';
import { isEmptyValue } from '../../utilities/string';
import classes from './styles/dropdown.scss';
// ADD POSSIBILITY FOR INITIAL STATE
const Dropdown = (
	{
		name,
		items,
		placeholder,
		multiSelect,
		onChange,
		onBlur,
		ariaLabel,
		ariaDescribedBy,
		ariaLabelledBy,
		dropdownId
	}
) => {
	const listRef = useRef(null);
	const buttonRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [selection, setSelection] = useState([]);
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const [focusedItemId, setFocusedItemId] = useState(null);

	useEffect(() => {
		if (isOpen) {
			if (listRef.current) {
				listRef.current.focus();
			}
		}

		const button = buttonRef.current;

		return () => {
			if (isOpen) {
				button.focus();
			}
		};
	}, [isOpen]);

	const uniqueDropdownId = useMemo(() => {
		return isEmptyValue(dropdownId) ? Date.now() : dropdownId;
	}, [dropdownId]);

	const toggleDropdownList = () => {
		setIsOpen(!isOpen);
	};

	const checkIsItemSelected = (id) => {
		return !!selection.find((current) => current.id === id);
	};

	const uncheckSelectedValue = (id) => {
		return selection.filter((current) => current.id !== id);
	};

	const getMultipleValue = (selectedItems = selection) => {
		return selectedItems.reduce((acc, item, index) => {
			if (index === 0) {
				acc = `${item.value}`;
			} else {
				acc = `${acc} | ${item.value}`;
			}

			return acc;
		}, '');
	};

	const getSingleValue = (selectedItems = selection) => {
		return (selectedItems[0] && selectedItems[0].value) || '';
	};

	const getFormattedValue = (selectedItems) => {
		return multiSelect ? getMultipleValue(selectedItems) : getSingleValue(selectedItems);
	};

	const getMultipleId = (selectedItems = selection) => {
		return selectedItems.reduce((acc, item) => {
			acc.push(item.id);

			return acc;
		}, []);
	};

	const getSingleId = (selectedItems = selection) => {
		return (selectedItems[0] && selectedItems[0].id) || '';
	};

	const getFormattedId = (selectedItems) => {
		return multiSelect ? getMultipleId(selectedItems) : getSingleId(selectedItems);
	};

	const updateSelection = (item) => {
		let updatedSelection = [...selection];
		const isItemAlreadySelected = checkIsItemSelected(item.id);

		if (!isItemAlreadySelected) {
			if (multiSelect) {
				updatedSelection = [...selection, item];
				setSelection([...selection, item]);
			} else {
				updatedSelection = [item];
				setSelection([item]);
			}
		}

		if (isItemAlreadySelected && multiSelect) {
			updatedSelection = uncheckSelectedValue(item.id);
		}

		setSelection([...updatedSelection]);

		return updatedSelection;
	};

	const initOnChange = (updatedSelection) => {
		const value = getFormattedId(updatedSelection);

		return Promise.resolve(onChange && onChange(null, name, value));
	};

	const initOnBlur = () => {
		onBlur && onBlur(null, name);
	};

	const onItemSelected = (item) => {
		const updatedSelection = updateSelection(item);

		initOnChange(updatedSelection)
			.then(() => {
				if (isOpen) {
					initOnBlur();
				}

				setIsOpen(false);
			});
	};

	const handleDropdownClick = () => {
		toggleDropdownList();

		if (isOpen) {
			initOnBlur();
		}
	};

	const handleDropdownKeyUp = (event) => {
		const { key } = event;

		if ((key === 'ArrowDown') && !isOpen) {
			return setIsOpen(true);
		}

		if ((key === 'Escape') && isOpen) {
			return setIsOpen(false);
		}
	};

	const handleListKeyDown = (event) => {
		const { key } = event;

		if ((key === 'Escape') && isOpen) {
			return setIsOpen(false);
		}

		if (key === 'ArrowDown') {
			if (focusedIndex === -1) {
				setFocusedItemId(items[0].id);
				return setFocusedIndex(0);
			}

			const newIndex = focusedIndex === items.length - 1 ? 0 : focusedIndex + 1;
			setFocusedItemId(items[newIndex].id);

			return setFocusedIndex(newIndex);
		}

		if (key === 'ArrowUp') {
			if (focusedIndex === -1) {
				setFocusedItemId(items[items.length - 1].id);
				return setFocusedIndex(items.length - 1);
			}

			const newIndex = focusedIndex === 0 ? items.length - 1 : focusedIndex - 1;

			setFocusedItemId(items[newIndex].id);
			return setFocusedIndex(newIndex);
		}
	};

	const handleListMouseEnter = () => {
		if (focusedIndex !== -1) {
			setFocusedIndex(-1);
		}
	};

	const handleListItemClick = (item) => {
		onItemSelected(item);
	};

	const handleListItemKeyDown = (event) => {
		const { key } = event;

		if ((key === 'Enter') && items[focusedIndex]) {
			onItemSelected(items[focusedIndex]);
		}
	};

	const formattedInputValue = getFormattedId();
	const formattedDropdownValue = getFormattedValue();

	// [data-reach-listbox-popover]:focus-within {
	/* -webkit-box-shadow: 0 0 4px Highlight; */
	/* box-shadow: 0 0 4px Highlight; */
	/* outline: 4px auto -webkit-focus-ring-color; */
	// }

	return (
		<>
			<div className={classes.dropdown}>
				<button
					type="button"
					aria-haspopup="listbox"
					aria-label={ariaLabel} // if other description absent
					aria-labelledby={ariaLabelledBy} // which element has label for input
					aria-describedby={ariaDescribedBy} // which element describe input
					aria-expanded={isOpen}
					aria-controls={uniqueDropdownId}
					onClick={handleDropdownClick}
					onKeyUp={handleDropdownKeyUp}
					ref={buttonRef}
					className={classes.dropdown__button}
				>
					<div>
						<p>{formattedDropdownValue || placeholder}</p>
					</div>
					<div>
						{
							isOpen ? 'Close' : 'Open'
						}
					</div>
				</button>
				{
					isOpen && (
						<ul
							id={uniqueDropdownId}
							role="listbox"
							tabIndex={0}
							ref={listRef}
							aria-multiselectable={multiSelect}
							aria-labelledby={ariaLabelledBy}
							onKeyDown={handleListKeyDown}
							onMouseEnter={handleListMouseEnter}
							className={classes.dropdown__list}
							aria-activedescendant={focusedItemId}
						>
							{
								items.map((item, index) => {
									const { id, value } = item;
									const isItemSelected = checkIsItemSelected(id);

									const dropdownLisItemClasses = classNames(
										classes.dropdown__listItem,
										{
											[classes.dropdown__listItem_active]: focusedIndex === index
										}
									);

									return (
										<li
											aria-selected={isItemSelected}
											role="option"
											id={id}
											key={id}
											className={dropdownLisItemClasses}
											onClick={() => handleListItemClick(item)}
											onKeyDown={handleListItemKeyDown}
											// aria-readonly
										>
											<span>{value}</span>
											{
												isItemSelected && <span> 🗸</span>
											}
										</li>
									);
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
