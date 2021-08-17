using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Models
{
    public class Bookings
    {
        public int BookingId { get; set; }
        public string BookedQuantity { get; set; }
        public string ResourceId { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
    }
}
