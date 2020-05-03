import React, { useState } from 'react';
import { Modal } from './components/Modal';
import { Field } from './components/Form';
import { Input } from './components/AccessibleFormField';
import { AccessibleForm } from './components/AccessibleForm';

const Section = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const handleOpen = () => {
		setIsModalOpen(true);
	};
	
	const handleClose = () => {
		setIsModalOpen(false);
	};
	
	return (
		<>
			<button
				type="button"
				onClick={handleOpen}
			>
				Open modal
			</button>
			<Modal
				isOpen={isModalOpen}
				onClose={handleClose}
			>
				<AccessibleForm
					onSubmit={console.log}
					formTitle="Enter data"
					ariaLabelledBy="enterData"
					initialValues={{
						firstName: 'John',
						agree: true,
						// movieType: 'fantasy'
					}}
				>
					<Field
						name="name"
						label="Name"
						component={Input}
					/>
					<Field
						name="surname"
						label="Surname"
						component={Input}
					/>
					<input type="submit" value="Submit" />
				</AccessibleForm>
			</Modal>
		</>
	);
};

export { Section };