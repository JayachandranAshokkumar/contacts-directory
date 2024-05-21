using ContactsAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public interface IContactService
    {
        public List<Contact> GetContact();
        public List<Contact> GetContact(int id);
        public Task<Contact> Update(Contact data);
        public void CreateContact(Contact contact);
        public bool ContactExists(int id);
        public Task DeleteContact(int id);
    }
}
