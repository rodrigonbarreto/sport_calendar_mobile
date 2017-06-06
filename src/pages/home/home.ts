import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public todayList;
  public lastWeekList;
  public twoWeeksAgo;

  constructor(
        public navCtrl: NavController, 
        private _http: 
        Http,private _loadingCtrl: 
        LoadingController, 
        private _alertCtrl: AlertController
    ) {}

  ngOnInit() {

      let loader = this._loadingCtrl.create({
        content: 'Buscando novos todayList. Aguarde ...'
      });
      
      loader.present();

      this._http
        .get('http://172.16.0.5:8080/en/exercise/list')
        .map(res => res.json())
        .toPromise()
        .then(todayList => {
          this.todayList = todayList['today'];
          this.lastWeekList = todayList['week_ago'];
          this.twoWeeksAgo = todayList['two_week_ago']
          console.log(this.todayList);
          
          loader.dismiss();
        })
        .catch(err => {
          console.log(err);
          loader.dismiss();
          this._alertCtrl
            .create({
              title: 'Falha na conexão',
              buttons: [{ text: 'Estou ciente!'}],
              subTitle: 'Não foi possível obter a lista de carros. Tente mais tarde.'
            }).present();
        });
  }

}
