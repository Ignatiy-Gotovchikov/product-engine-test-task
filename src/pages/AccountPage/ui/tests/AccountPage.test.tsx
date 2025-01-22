import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../../../../app/providers/StoreProvider/storeForTests';
import AccountPage from '../AccountPage';

global.fetch = jest.fn();

describe('AccountPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display user data after successful search', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          data: {
            id: 2,
            email: 'janet.weaver@reqres.in',
            first_name: 'Janet',
            last_name: 'Weaver'
          }
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    );

    const store = setupStore();
    render(
      <Provider store={store}>
        <AccountPage />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/User ID/i), { target: { value: '2' } });
    fireEvent.click(screen.getByText(/Search/i));

		expect(await screen.findByText((content, element) => {
			return element?.textContent === 'ID: 2';
		})).toBeInTheDocument();
		
		expect(await screen.findByText((content, element) => {
			return element?.textContent === 'Email: janet.weaver@reqres.in';
		})).toBeInTheDocument();
		
		expect(await screen.findByText((content, element) => {
			return element?.textContent === 'First Name: Janet';
		})).toBeInTheDocument();

		expect(await screen.findByText((content, element) => {
			return element?.textContent === 'Last Name: Weaver';
		})).toBeInTheDocument();
  });

  it('should display "No data found" if user not found', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(null, {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'application/json' }
      })
    );

    const store = setupStore();
    render(
      <Provider store={store}>
        <AccountPage />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/User ID/i), { target: { value: '999' } });
    fireEvent.click(screen.getByText(/Search/i));

    expect(await screen.findByText(/No data found/i)).toBeInTheDocument();
  });
});
