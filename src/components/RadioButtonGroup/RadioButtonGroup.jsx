import React from 'react';
import classes from './styles/index.scss';
// FIX REQUIRE AFTER FIRST BLUR ON RADIO BUTTON ELEMENT
const RadioButtonGroup = (
	{
		items,
		required,
		ariaLabelledBy,
		ariaDescribedBy,
		radioGroupLabel,
		radioGroupLabelId,
		radioButtonComponent
	}
) => {
	const radioGroupLabelledBy = radioGroupLabelId !== ariaLabelledBy ? radioGroupLabelId : ariaLabelledBy;

	return (
		<div
			role="radiogroup"
			className={classes.radioButtonGroup}
			aria-required={required}
			aria-describedby={ariaDescribedBy} // which element describe input
			aria-labelledby={radioGroupLabelledBy} // which element has label for radio group
		>
			<h2
				id={radioGroupLabelId}
				className={classes.radioButtonGroup__title}
			>
				{radioGroupLabel}
			</h2>
			<div className={classes.radioButtonGroup__radioButtonsContainer}>
				{
					items.map((item) => {
						return (
							<div
								key={item.value}
								className={classes.radioButtonGroup__radioButton}
							>
								{radioButtonComponent(item)}
							</div>
						);
					})
				}
			</div>
		</div>
	);
};

export { RadioButtonGroup };
