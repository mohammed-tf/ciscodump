import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
interface Post{
  answA:string;
  answB:string;
  answC:string;
  answD:string;
  answE:string;
  answF:string;
  question:string;
  answers:boolean[];
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  topics=['Basic Questions','OSI TCP/IP Model','Cloud and Virual Services','WAN','PPP','QoS','PPPoE','MPLS','DMVPN','CDP & LLDP','IP Address','Switch','VLAN','Trunking','STP','RSTP','VTP','Port Security','SPAN','EtherChannel','Inter VLAN Routing','Router','Switch Stacking & Chassis Aggregation','Access List','IP Routing','Subnetting','RIP','OSPF','EIGRP','BGP','IP SLA','NAT/PAT','HSRP','IPv6','Security','Troubleshooting','DHCP','Syslog','SNMP','NTP','SDN Solution','Wireless','Miscellaneous','Drag & Drop'];
  topic:string;
  a:boolean;
  b:boolean;
  c:boolean;
  d:boolean;
  e:boolean;
  f:boolean;
  answA:string;
  answB:string;
  answC:string;
  answD:string;
  answE:string;
  answF:string;
  question:string;
  qValue;
  aValue;
  bValue;
  cValue;
  dValue;
  eValue;
  fValue;
count:number;

postsCol: AngularFirestoreCollection<Post>;
posts : Observable<any[]>;


  constructor(private afs: AngularFirestore) {  }
  

  ngOnInit() {

    
    this.postsCol = this.afs.collection('posts') ;
    this.posts = this.postsCol.snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
    
    this.posts.subscribe(result => {
      this.count=result.length});

  
  }
  addPost() {
    let options=[]
    let answers=[]

    let zr=[this.a,this.b,this.c,this.d,this.e,this.f]
    let rz=['A','B','C','D','E','F']
    for (let i = 0; i < zr.length; i++) { if(zr[i] =! undefined && zr[i] ==! false){answers.push(rz[i])}}

     let ans=[this.answA,this.answB,this.answC,this.answD,this.answE,this.answF];
    for (let i = 0; i < ans.length; i++) {
      if (ans[i]) {
        options.push(ans[i]);

      }
      
    }
   
            
    console.log(this.topic)

this.afs.collection('posts').doc('Q'+this.count).set({ 'Topic':this.topic,'Question':this.question, 'Options':options, 'Answers':answers})


}


  delete(data){ 
  this.postsCol.doc(data).delete();
  
    }
}
