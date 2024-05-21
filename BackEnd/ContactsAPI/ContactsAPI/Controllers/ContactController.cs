using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Models;
using ContactsAPI.Services;
using EFCoreInMemoryDbDemo;
using Microsoft.AspNetCore.Mvc;


namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        //Creating instance for IContactService
        private readonly IContactService _contactDataService;
        public ContactController(IContactService dataService)
        {
            _contactDataService = dataService;
        }

        // GET: api/<controller>
        //To get all the contact details
        [HttpGet]
        public List<Contact> Get()
        {
            ContactService contactservice = new();
            return contactservice.GetContact();
        }

        // GET api/<controller>/5
        // To get the specific contact details using Id
        [HttpGet("{id}")]
        public Contact Get(int id)
        {
            ContactService contactservice = new();
            return contactservice.GetContact(id).FirstOrDefault();
        }

        // POST api/<controller>
        //To create a new contact
        [HttpPost]
        public IActionResult CreateContact([FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Handle invalid data
            }
            _contactDataService.CreateContact(contact);
            ContactService contactservice = new();
            return Ok(contactservice.GetContact(contact.Id).FirstOrDefault()); // Created status code with location header
        }

        [HttpPut("{id}")]
        // PUT api/<controller>/5
        //To update a specific contact using Id
        public async Task<IActionResult> UpdateData(int id, Contact data)
        {
            if (id != data.Id)
            {
                return BadRequest("ID mismatch in request body and URL");
            }
            try
            {
                var updatedData = await _contactDataService.Update(data);
                if (updatedData == null)
                {
                    return NotFound("Data with the specified ID not found");
                }
                return Ok(updatedData); // Return the updated data
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); // Handle internal server errors
            }
        }

        // DELETE api/<controller>/5
        //To delete a specific contact using Id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            if (!_contactDataService.ContactExists(id))
            {
                return NotFound(); // Handle non-existent contact
            }

            await _contactDataService.DeleteContact(id);
            return Ok("Contact deleted!"); // No content returned on successful deletion
        }
    }
}
