namespace InventoryAPI.Models
{
    public class Inventory
    {
        public int ProductID { get; set; }
        public string? ProductName { get; set; }
        public int StockAvailaible { get; set; }
        public int ReOrderStock { get; set; }
    }
}
