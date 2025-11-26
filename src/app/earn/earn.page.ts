import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../service/server.service';
import { ToastController,NavController,Platform,LoadingController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-earn',
  templateUrl: './earn.page.html',
  styleUrls: ['./earn.page.scss'],
})

export class EarnPage implements OnInit {
  
  data:any;
  udata:any;
  text:any;

  constructor(private route: ActivatedRoute,public server : ServerService,public toastController: ToastController,private nav: NavController,public loadingController: LoadingController,public alertController: AlertController){

  this.text = JSON.parse(localStorage.getItem('app_text'));

   if(localStorage.getItem('user_data') && localStorage.getItem('user_data') != undefined)
   {
     this.udata = JSON.parse(localStorage.getItem('user_data'));
   }

  }

  ngOnInit()
  {
    if(this.udata && this.udata.phone)
    {
      this.loadData();
    }
  }

 
  ionViewWillEnter()
  {
  	
  }

  async loadData()
  {	
  	console.log("loading");

    const loading = await this.loadingController.create({
      message: '',
      spinner : 'bubbles'
      
    });
    await loading.present();

    this.server.earn(localStorage.getItem('user_id')).subscribe((response:any) => {
  
    this.data = response.data;

    loading.dismiss();

    });
  }

  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 3000,
      position : 'top',
      mode:'ios',
      color:'dark'
    });
    toast.present();
  }
}
