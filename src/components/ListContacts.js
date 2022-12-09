const ListContacts = props => {
	return (
		<ol className='contact-list'>
			{props.contacts.map(contact => (
				<li key={contact.id}>{contact.name}</li>
			))}
		</ol>
	);
};

export default ListContacts;
