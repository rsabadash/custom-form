import React from 'react';
import classNames from 'classnames';
import classes from './styles/index.scss';

type ButtonProps = {
	testId?: string;
	type?: 'button' | 'submit';
	colorType?: 'secondary' | 'ghost';
	ariaHaspopup?: boolean | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
	ariaExpanded?: boolean;
	handleClick?: React.MouseEventHandler
};

const Button: React.FC<ButtonProps> = (
	{
		type,
		testId,
		children,
		colorType,
		handleClick,
		ariaExpanded,
		ariaHaspopup
	}
) => {
	const buttonClassNames = classNames(
		classes.button,
		{
			[classes[`button_${colorType}`]]: colorType
		}
	);

	const handleButtonClick = (e: React.MouseEvent) => {
		e.persist();
		handleClick && handleClick(e);
	};

	return (
		<button
			type={type}
			data-testid={testId}
			className={buttonClassNames}
			onClick={handleButtonClick}
			aria-haspopup={ariaHaspopup}
			aria-expanded={ariaExpanded}
		>
			<div className={classes.button__inner}>
				{children}
			</div>
		</button>
	);
};

Button.defaultProps = {
	type: 'button',
	testId: 'testButton'
};

export { Button };
