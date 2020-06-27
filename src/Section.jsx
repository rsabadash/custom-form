import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalFooter } from './components/Modal';
import { Field } from './components/Form';
import { Button } from './components/Button';
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
			<Button
				colorType="ghost"
				ariaHaspopup="dialog"
				ariaExpanded={isModalOpen}
				handleClick={handleOpen}
			>
				Open
			</Button>

			<Modal
				isOpen={isModalOpen}
				ariaLabelledBy="testModal"
				onClose={handleClose}
			>
				<ModalHeader>
					Confirm movie
				</ModalHeader>
				<ModalContent>
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
				</ModalContent>
				<ModalFooter>
					<Button>
						Ok
					</Button>
					<Button
						colorType="ghost"
						handleClick={handleClose}
					>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export { Section };
