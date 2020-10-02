import { ReactNode } from 'react';

export type AccessibleFormProps<FormValues> = {
	children: ReactNode;
	onSubmit: (values: FormValues) => void;
	formTitle: string;
	initialValues?: Partial<FormValues>
	ariaLabelledBy: string;
};
