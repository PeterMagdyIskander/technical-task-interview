using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using webAPI.Models;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public BookingController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        //add new booking
        [HttpPost]
        public JsonResult Post(Booking booking)
        {

            //insert in the table the new booking record
            string query = @"
                    insert into dbo.Booking
                    values 
                    (
                    '" + booking.BookedQuantity + @"'
                    ,'" + booking.ResourceId + @"'
                    ,'" + booking.DateFrom + @"'
                    ,'" + booking.DateTo + @"'
                    )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TaskAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }


            //return the last index in the table as this index is the most recently added one,
            //first by ordering it descending
            //ofc this is bad logic, bas this is as far as i know right now

            query = @"
                SELECT TOP 1 * FROM dbo.Booking ORDER BY bookingid DESC";
            table = new DataTable();
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }



            return new JsonResult(table);
        }
    }
}
