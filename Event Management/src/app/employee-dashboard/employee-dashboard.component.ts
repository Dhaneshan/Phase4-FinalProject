import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit 
{
  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData : any;
  showAdd !: boolean;
  showUpdate !: boolean;
  person:any;
  constructor(private formbuiler: FormBuilder, private api : ApiService) { }
  ngOnInit(): void {
    this.formValue = this.formbuiler.group({
      firstName : [''],
      lastName : [''],
      email : ['']
    })
    this.getAllEmployee();
  }
  clickAddEmployee()
  {
    this.formValue.reset();
    this.showAdd= true;
    this.showUpdate= false;

  }
  postEmployeeDetails()
  {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("employee Added")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something went wrong")
    })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;

    })
  }
    getEmployeebyid(temp:any)
    {
      this.api.getEmployeebyid(temp.id)
      .subscribe(res=>{
        this.employeeData = res;
  
      })
  }
  deleteEmployee(temp : any){
    this.api.deleteEmployee(temp.id)
    .subscribe(res=>{
      alert("employee Deleted");
      this.getAllEmployee();
    })
  }
  onEdit(temp : any)
  {
    this.showAdd= false;
    this.showUpdate= true;
    this.employeeModelObj.id = temp.id;
    this.formValue.controls['firstName'].setValue(temp.firstName);
    this.formValue.controls['lastName'].setValue(temp.lastName);
    this.formValue.controls['email'].setValue(temp.email);
  }
  updateEmployee()
  {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}
