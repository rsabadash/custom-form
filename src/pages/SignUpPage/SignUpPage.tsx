import React from 'react';
import { ShadowContainer } from '../../components/ShadowContainer';
import { Registration } from '../../modules/Registration';
import classes from './styles/index.scss';

const SignUpPage = () => {
	return (
		<ShadowContainer
			shadowContainerClassName={classes.signUp__formContainer}
		>
			<Registration />
		</ShadowContainer>
	);
};

export { SignUpPage };
