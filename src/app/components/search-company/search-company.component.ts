import { CompanyModel } from './../../model/company-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.css']
})
export class SearchCompanyComponent implements OnInit {

  companies: CompanyModel[] = [{"id":10, "companyName":"abcdefghijklmnop", "ceo":"", "boardOfDirectors":"","briefWriteup":"", "sector":null, "turnover":123, "exchange":null}, 
    {"id":11, "companyName":"abcdefxcx", "ceo":"", "boardOfDirectors":"","briefWriteup":"", "sector":null, "turnover":123, "exchange":null},
    {"id":13, "companyName":"abcdefghxcxc", "ceo":"", "boardOfDirectors":"","briefWriteup":"", "sector":null, "turnover":123, "exchange":null},
    {"id":12, "companyName":"abcdefghxc12", "ceo":"", "boardOfDirectors":"","briefWriteup":"", "sector":null, "turnover":123, "exchange":null}
  ];

  constructor() { }

  ngOnInit() {
  }

}
