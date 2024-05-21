using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace EFCoreInMemoryDbDemo
{
    public class ContactDBData : DbContext
    {
        protected override void OnConfiguring
        (DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "ContactDb");
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}