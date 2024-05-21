using System.ComponentModel.DataAnnotations;

namespace ContactsAPI.Models
{
    public class Contact
    {
        [Required]
        public int Id { get; set; }
        public string ContactName { get; set; }
        [RegularExpression("([0-9]+)")]
        public string Number { get; set; }
        public string City { get; set; }
    }
}
