import propTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ListContacts = props => {
	const [query, setQuery] = useState('');
	const contactSearchHandler = e => {
		setQuery(e.target.value);
	};

	const clearQueryHandler = () => {
		setQuery('');
	};

	const showContacts =
		query === '' ? props.contacts : props.contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
	return (
		<div className='list-contacts'>
			<div className='list-contacts-top'>
				<input
					type='search'
					placeholder='Search Contacts'
					className='search-contacts'
					value={query}
					onChange={contactSearchHandler}
				/>
				<Link to='/create' className='add-contact'>
					Add Contact
				</Link>
			</div>
			{showContacts.length !== props.contacts.length && (
				<div className='showing-contacts'>
					<span>
						Now showing {showContacts.length} of {props.contacts.length}
					</span>
					<button onClick={clearQueryHandler}>Show all</button>
				</div>
			)}
			<ol className='contact-list'>
				{showContacts.map(contact => (
					<li key={contact.id} className='contact-list-item'>
						<div className='contact-avatar' style={{ backgroundImage: `url(${contact.avatarURL})` }}></div>
						<div className='contact-details'>
							<p>{contact.name}</p>
							<p>{contact.handle}</p>
						</div>
						<button className='contact-remove' onClick={() => props.onDeleteContact(contact)}>
							Remove
						</button>
					</li>
				))}
			</ol>
		</div>
	);
};

ListContacts.propTypes = {
	contacts: propTypes.array.isRequired,
	onDeleteContact: propTypes.func.isRequired,
};

export default ListContacts;
