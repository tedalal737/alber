import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-megzi3-ekfalni',
  templateUrl: './megzi3-ekfalni.component.html',
  styleUrls: ['./megzi3-ekfalni.component.css']
})
export class Megzi3EkfalniComponent implements OnInit {

  adoptedTotal: number;

  constructor(
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.afs.doc<any>('totals/adoptions').valueChanges()
      .subscribe(data=>{
        this.adoptedTotal = data.raCkL5VyR5KOP8RJVPf7;
      });
  }

}
