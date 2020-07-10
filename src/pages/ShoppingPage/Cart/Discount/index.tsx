import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Container } from './styles';

import api from '~/services/api';

import { ApplicationState } from '~/store';
import { IVoucher } from '~/store/modules/cart/types';
import { addVoucher } from '~/store/modules/cart/actions';

const Discount: React.FC = () => {
	const [handlingSubmit, setHandlingSubmit] = useState(false);
	const [value, setValue] = useState('');

	const vouchers = useSelector(
		(state: ApplicationState) => state.cart.vouchers
	);
	const dispatch = useDispatch();
	const handleAddVoucher = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();
			if (handlingSubmit) return;

			setHandlingSubmit(true);
			try {
				const { data } = await api.get('vouchers.json');
				const apiVouchers: IVoucher[] = data.vouchers;

				const voucher = apiVouchers.find((voucher) => voucher.code === value);
				if (!voucher) {
					toast.warning('No voucher was found with this code');
					return;
				}

				const exists = vouchers.find(({ id }) => voucher.id === id);
				if (!exists) {
					dispatch(addVoucher(voucher));
					toast.success('Voucher added');
				} else toast.warning('This voucher has already been added');
			} catch (error) {
				toast.error('Something went wrong. Please try again');
			} finally {
				setHandlingSubmit(false);
			}
		},
		[dispatch, handlingSubmit, value, vouchers]
	);

	return (
		<Container onSubmit={handleAddVoucher}>
			<input
				type="text"
				placeholder="Discount code"
				onChange={(event) => setValue(event.target.value)}
				value={value}
			/>
			<button type="submit">Apply</button>
		</Container>
	);
};

export default Discount;
