import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../../../../app/providers/StoreProvider/storeForTests';
import EditAccountForm from '../EditAccountForm';

global.fetch = jest.fn();

describe('EditAccountForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show error if same email is submitted', async () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <EditAccountForm
          userId={2}
          currentEmail="janet.weaver@reqres.in"
          onSuccessUpdate={() => {}}
        />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByText(/Field is not updated/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

	it('should call PUT and show success if new email is submitted', async () => {
		(fetch as jest.Mock).mockResolvedValueOnce(
			new Response(
				JSON.stringify({
					email: 'new.email@reqres.in',
					updatedAt: '2025-01-01T12:34:56Z'
				}),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' }
				}
			)
		);
	
		const store = setupStore();
		const onSuccessMock = jest.fn();
	
		render(
			<Provider store={store}>
				<EditAccountForm
					userId={2}
					currentEmail="janet.weaver@reqres.in"
					onSuccessUpdate={onSuccessMock}
				/>
			</Provider>
		);
	
		fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'new.email@reqres.in' } });
		fireEvent.click(screen.getByText(/Submit/i));
	
		await waitFor(() => {
			expect(fetch).toHaveBeenCalledTimes(1);
		});

		const fetchCall = (fetch as jest.Mock).mock.calls[0];
		const requestObject = fetchCall[0]; 

		expect(requestObject.url).toBe('https://reqres.in/api/users/2');

		expect(requestObject.method).toBe('PUT');

		expect(requestObject._bodyInit).toBe(JSON.stringify({ email: 'new.email@reqres.in' }));

		expect(
			await screen.findByText(/Successfully updated email to "new.email@reqres.in"/i)
		).toBeInTheDocument();

		expect(onSuccessMock).toHaveBeenCalledWith('new.email@reqres.in');
	});
	
});
