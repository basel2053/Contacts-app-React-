import { useState, useEffect } from 'react';
import '../css/App.css';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from '../utils/ContactsAPI';
import { Route, Routes, useNavigate } from 'react-router-dom';
const App = () => {
	let navigate = useNavigate();
	const removeContact = contact => {
		ContactsAPI.remove(contact);
		setContacts(contacts.filter(c => c.id !== contact.id));
	};
	const createContact = contact => {
		const create = async () => {
			const res = await ContactsAPI.create(contact);
			setContacts(prevState => [...prevState, res]);
			// setContacts(contacts.contact(res));
		};
		create();
		navigate('/'); // after creating a new contact we return user to root path
	};
	const [contacts, setContacts] = useState([]);
	useEffect(() => {
		const getContacts = async () => {
			const res = await ContactsAPI.getAll();
			setContacts(res);
		};
		getContacts();
	}, []);
	return (
		<Routes>
			<Route exact path='/' element={<ListContacts contacts={contacts} onDeleteContact={removeContact} />} />
			{/* <Route
				path='/create'
				element={
					<CreateContact
						onCreateContact={contact => {
							createContact(contact);
						}}
					/>
				}
			/> */}
			<Route path='/create' element={<CreateContact onCreateContact={createContact} />} />
		</Routes>
	);
};

export default App;
