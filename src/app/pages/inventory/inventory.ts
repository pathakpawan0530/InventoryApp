import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
  standalone: true
  
})

export class Inventory   {
  inventoryDto:any; 
    inventoryData = {
    productId: '',
    productName: '',
    stockAvailable: 0,
    reorderStock: 0

  };
  IsUpdated:boolean=false;

  constructor(private httpClient: HttpClient,private cd:ChangeDetectorRef) { }

ngOnInit(){
  this.GetData();
}

UpdateProduct(item: any){
  this.inventoryData.productId = item.ProductID;
  this.inventoryData.productName = item.ProductName;
  this.inventoryData.stockAvailable = item.StockAvailable;
  this.inventoryData.reorderStock = item.ReorderStock;
  this.IsUpdated=true;
}

  GetData(){
    this.httpClient.get('https://localhost:7187/api/Inventory/GetInventoryData').subscribe({
      next: x => {
        console.log(x);
        this.inventoryDto = x;
        this.cd.detectChanges();
      },
      error: err => console.log(err),
      complete: () => {
        console.log('Data Fetched Successfully');
      }
    })
  }

DeleteProduct(productId: any){
  var flag = confirm("Are you sure to delete this product?");
  if(flag){
  this.httpClient.delete('https://localhost:7187/api/Inventory/DeleteInventory?productId='+productId,
    {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'text'
  }
  )
  .subscribe(data=>{
    alert(data);  
    this.GetData();
  },(error)=>{console.log(error);
  })
  }



  }
  onSubmit(ngForm: any) {
    debugger;
    if(ngForm.invalid){
      alert('Please fill all required fields');
      return;
    }
    if(this.IsUpdated){
      this.UpdateProductdtls(ngForm);
    }else{
    this.httpClient.post('https://localhost:7187/api/Inventory/SaveInventory',
      this.inventoryData,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'text'
  }).subscribe(data=>{
        debugger;
        alert('Inventory Data Submitted Successfully');
        this.ResetForm();
        this.GetData();
      },(error)=>{console.log(error);
      }
      )
    }


  }

  UpdateProductdtls(ngForm:any){
    this.httpClient.put('https://localhost:7187/api/Inventory/UpdateInventory',
      this.inventoryData,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'text'
  }).subscribe(data=>{
        debugger;
        alert('Inventory Data Updated Successfully');
        this.ResetForm();
        this.GetData();
        this.IsUpdated=false;
      },(error)=>{console.log(error);
      }
      )
  }

  ResetForm(){
    this.inventoryData = {
      productId: '',
      productName: '',
      stockAvailable: 0,
      reorderStock: 0
    };
  }

  trackByFn(index: number, item: any) {
  return item.ProductID;
}
}
