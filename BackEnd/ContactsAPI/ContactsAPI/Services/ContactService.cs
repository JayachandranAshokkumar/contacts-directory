using ContactsAPI.Models;
using ContactsAPI.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace EFCoreInMemoryDbDemo
{
    public class ContactService : IContactService
    {
        //Constructor of ContactService - Assigning data to ContactDBData
        public ContactService()
        {
            using (var context = new ContactDBData())
            {
                if (context.Contacts.Count() == 0)
                {
                    var contact = new List<Contact>
                    {
                    new Contact
                    {
                        Id = 1,
                        ContactName = "Bob Hughes",
                        Number = "9677656321",
                        City = "Herndon"
                    },
                    new Contact
                    {
                        Id = 2,
                        ContactName = "Mike Corkery",
                        Number = "9677656322",
                        City = "New York"
                    },
                    new Contact
                    {
                        Id = 3,
                        ContactName = "APJ Abdul Kalam",
                        Number = "9677656323",
                        City = "Ramanathapuram"
                    },
                    new Contact
                    {
                        Id = 4,
                        ContactName = "Jayachandran Ashokkumar",
                        Number = "9677656324",
                        City = "Karaikal"
                    },
                    new Contact
                    {
                        Id = 5,
                        ContactName = "Ashokkumar Gunasundari",
                        Number = "9677656325",
                        City = "Karaikal"
                    },
                    new Contact
                    {
                        Id = 6,
                        ContactName = "Gunasundari Ashokkumar",
                        Number = "9677656326",
                        City = "Karaikal"
                    },
                    new Contact
                    {
                        Id = 7,
                        ContactName = "Mathini Ashokkumar",
                        Number = "9677656327",
                        City = "Karaikal"
                    },
                    new Contact
                    {
                        Id = 8,
                        ContactName = "Priyanga",
                        Number = "9677656328",
                        City = "Chennai"
                    },
                    new Contact
                    {
                        Id = 9,
                        ContactName = "Rinki Sharma",
                        Number = "9677656329",
                        City = "Bangalore"
                    },
                    new Contact
                    {
                        Id = 10,
                        ContactName = "Joylin Sundar",
                        Number = "9677656320",
                        City = "Chennai"
                    }
                    };
                    context.Contacts.AddRange(contact);
                    context.SaveChanges();
                }
            }
        }

        //Get all the contacts details
        public List<Contact> GetContact()
        {
            using (var context = new ContactDBData())
            {
                var list = (from contact in context.Contacts select contact).ToList();
                return list;
            }
        }

        //Get a specific contact details using id
        public List<Contact> GetContact(int id)
        {
            using (var context = new ContactDBData())
            {
                var matchedContact = (from contact in context.Contacts where contact.Id == id select contact).ToList();
                return matchedContact;
            }
        }

        //Update a specific contact details using id
        public async Task<Contact> Update(Contact data)
        {
            ContactDBData _context = new();
            List<Contact> _data = GetContact(data.Id);
            var index = _data.FindIndex(item => item.Id == data.Id);
            if (index == -1)
            {
                return null;
            }
            _data[index] = data;
            _context.Contacts.Update(_data[index]);
            _context.SaveChangesAsync(); //Save operation after the update
            return _data[index];
        }

        //To create a new contact
        public void CreateContact(Contact contact)
        {
            ContactDBData _context = new();
            _context.Contacts.Add(contact);
            _context.SaveChangesAsync();
        }

        //Check whether the contact is exist or not using id 
        public bool ContactExists(int id)
        {
            ContactDBData _context = new();
            return _context.Contacts.Any(c => c.Id == id);
        }

        //Delete a specific contact details using id
        public async Task DeleteContact(int id)
        {
            ContactDBData _context = new();
            var contact = await _context.Contacts.FindAsync(id);
            if (contact != null)
            {
                _context.Contacts.Remove(contact);
                await _context.SaveChangesAsync(); //Save operation after the delete
            }
        }
    }
}
