import React, { useState } from 'react';
import { Modal } from './components/Modal';
import { Field } from './components/Form';
import { Dropdown, Input } from './components/AccessibleFormField';
import { AccessibleForm } from './components/AccessibleForm';
import { required } from './utilities/formValidators';

const Section = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const dropdownItems = [
		{
			id: 34,
			value: 'The Prestige'
		},
		{
			id: 56,
			value: 'Blade Runner 2049'
		}
	];
	
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
					initialValues={{}}
				>
					<Field
						name="name"
						label="Name"
						component={Input}
					/>
					<Field
						required
						placeholder="Select movie"
						label="Movies"
						items={dropdownItems}
						name="movie"
						multiSelect
						component={Dropdown}
						validate={[required()]}
					/>
					<input type="submit" value="Submit" />
				</AccessibleForm>
			</Modal>
		</>
	);
};

export { Section };