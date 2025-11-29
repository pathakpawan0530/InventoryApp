using InventoryAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json.Serialization;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        [HttpPost]
        public ActionResult SaveInventory(Inventory inventory)
        {
            SqlConnection connection = new SqlConnection
            {
                ConnectionString = "Server=(localdb)\\MSSQLLocalDB;Database=InventoryApp;Trusted_Connection=True;MultipleActiveResultSets=true"
            };
         
            SqlCommand command = new SqlCommand
            {
                CommandText = "SP_SAVE_INVENTORY_DATA",
                CommandType = CommandType.StoredProcedure,
                Connection = connection
            };
            command.Parameters.AddWithValue("@ProductID", inventory.ProductID);
            command.Parameters.AddWithValue("@ProductName", inventory.ProductName);
            command.Parameters.AddWithValue("@StockAvailaible", inventory.StockAvailaible);
            command.Parameters.AddWithValue("@ReOrderStock", inventory.ReOrderStock);
            connection.Open();
            command.ExecuteNonQuery();
            connection.Close(); 

            return Ok("Inventory Data Saved.");

        }

        [HttpGet]
        public ActionResult GetInventoryData()
        {
            SqlConnection connection = new SqlConnection
            {
                ConnectionString = "Server=(localdb)\\MSSQLLocalDB;Database=InventoryApp;Trusted_Connection=True;MultipleActiveResultSets=true"
            };

            SqlCommand command = new SqlCommand
            {
                CommandText = "SP_GETALL",
                CommandType = CommandType.StoredProcedure,
                Connection = connection
            };
            List<InventoryViewModel> response = new List<InventoryViewModel>();
            connection.Open();
            using (SqlDataReader reader = command.ExecuteReader()) {
                while (reader.Read())
                {
                    InventoryViewModel  inventoryViewModel = new InventoryViewModel();
                    inventoryViewModel.ProductID = Convert.ToInt16(reader["ProductId"]);
                    inventoryViewModel.ProductName = reader["ProductName"].ToString();
                    inventoryViewModel.StockAvailaible = Convert.ToInt16(reader["StockAvailaible"]);
                    inventoryViewModel.ReOrderStock = Convert.ToInt16(reader["ReOrderStock"]);

                    response.Add(inventoryViewModel);
                }
            }
            connection.Close();

            return Ok(JsonConvert.SerializeObject(response));

        }

        [HttpDelete]
        public ActionResult DeleteInventory(int productId)
        {
            SqlConnection connection = new SqlConnection
            {
                ConnectionString = "Server=(localdb)\\MSSQLLocalDB;Database=InventoryApp;Trusted_Connection=True;MultipleActiveResultSets=true"
            };

            SqlCommand command = new SqlCommand
            {
                CommandText = "sp_DELETEInventoryDetails",
                CommandType = CommandType.StoredProcedure,
                Connection = connection
            };
            command.Parameters.AddWithValue("@ProductID", productId);
            connection.Open();
            command.ExecuteNonQuery();
            connection.Close();

            return Ok("Inventory Deleted.");


        }


        [HttpPut]
        public ActionResult UpdateInventory(Inventory inventory)
        {
            SqlConnection connection = new SqlConnection
            {
                ConnectionString = "Server=(localdb)\\MSSQLLocalDB;Database=InventoryApp;Trusted_Connection=True;MultipleActiveResultSets=true"
            };

            SqlCommand command = new SqlCommand
            {
                CommandText = "SP_UPDATE_INVENTORY",
                CommandType = CommandType.StoredProcedure,
                Connection = connection
            };
            command.Parameters.AddWithValue("@ProductID", inventory.ProductID);
            command.Parameters.AddWithValue("@ProductName", inventory.ProductName);
            command.Parameters.AddWithValue("@StockAvailaible", inventory.StockAvailaible);
            command.Parameters.AddWithValue("@ReOrderStock", inventory.ReOrderStock);
            connection.Open();
            command.ExecuteNonQuery();
            connection.Close();

            return Ok("Inventory Updated.");


        }

    }
}
