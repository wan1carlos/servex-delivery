import { Component, OnInit,ViewChild } from '@angular/core';
import { ServerService } from '../service/server.service';
import { NavController,Platform,LoadingController,IonSlides,AlertController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  data:any;
  text:any;
intr:any;
userData:any;
online = false;

  constructor(public toastController: ToastController,public alertController: AlertController,public server : ServerService,private nav: NavController,public loadingController : LoadingController)
  {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
  }

  ionViewWillEnter()
  {
    if(localStorage.getItem('app_text') && localStorage.getItem('app_text') != undefined)
    {
      this.text = JSON.parse(localStorage.getItem('app_text'));
    }

    this.loadData();
  }

  ngOnInit()
  {
    
  }

  async loadData()
  {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
    });
    await loading.present();

    this.server.homepage(localStorage.getItem('user_id'),3).subscribe((response:any) => {
    this.data = response.data;
    this.text = response.text;
    this.online = response.dboy.online == 1 ? true : false;
    localStorage.setItem('app_text', JSON.stringify(response.text));

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

  detail(odata)
  {
    
    localStorage.setItem('odata', JSON.stringify(odata));
    
    this.nav.navigateForward('/detail');
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.loadData();
      event.target.complete();
    }, 1000);
  }

  setStatus(s)
  {
    var online = this.online == true ? 1 : 0;

    this.server.setStatus(localStorage.getItem('user_id'),online).subscribe((response:any) => {

    });
  }

  async accept(odata)
  {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
    });
    await loading.present();

    this.server.accept(localStorage.getItem('user_id'),odata.id).subscribe((response:any) => {
    
    if(response.data != "error")
    {
      this.data = response.data; 
    }
    else
    {
      this.presentToast("Opps! this order is already assigned to somebody else.");
      this.loadData();
    }

    loading.dismiss();

    });
  }
}
