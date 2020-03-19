import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-marwa-ekfalni',
  templateUrl: './marwa-ekfalni.component.html',
  styleUrls: ['./marwa-ekfalni.component.css']
})
export class MarwaEkfalniComponent implements OnInit {

  adoptedTotal: number;

  constructor(
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.afs.doc<any>('totals/adoptions').valueChanges()
      .subscribe(data=>{
        this.adoptedTotal = data.zCQ3Dhxv5dQza3qKxhrV;
      });
  }

}
