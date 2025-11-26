import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  
  // API base URL from environment
  url = environment.apiBaseUrl + 'dboy/';

  constructor(private http: HttpClient) { }

  homepage(id,status)
  {
    return this.http.get(this.url+'homepage?lid='+localStorage.getItem('lid')+"&dboy_id="+id+"&status="+status+"&lat="+localStorage.getItem("current_lat")+"&lng="+localStorage.getItem("current_lng"))
             .pipe(map(results => results));
  }

  page()
  {
    return this.http.get(this.url+'page?lid='+localStorage.getItem('lid'))
             .pipe(map(results => results));
  }


  my(id)
  {
    return this.http.get(this.url+'my?id='+id+'&lid='+localStorage.getItem('lid'))
             .pipe(map(results => results));
  }

  getLang(id)
  {
    return this.http.get(this.url+'getLang?lang_id='+id)
             .pipe(map(results => results));
  }

  login(data)
  {
    return this.http.post(this.url+'login',data)
             .pipe(map(results => results));
  }

  updatePassword(data)
  {
    return this.http.post(this.url+'updatePassword',data)
             .pipe(map(results => results));
  }

  userInfo(id)
  {
    return this.http.get(this.url+'userInfo/'+id)
             .pipe(map(results => results));
  }

  updateInfo(data)
  {
    return this.http.post(this.url+'updateInfo',data)
             .pipe(map(results => results));
  }

  startRide(id,status)
  {
    return this.http.get(this.url+'startRide?id='+id+'&lid='+localStorage.getItem('lid')+'&status='+status)
             .pipe(map(results => results));
  }

  setStatus(id,online)
  {
    return this.http.get(this.url+'setStatus?id='+id+'&online='+online+"&lat="+localStorage.getItem('current_lat')+"&lng="+localStorage.getItem('current_lng'))
             .pipe(map(results => results));
  }

  accept(id,oid)
  {
    return this.http.get(this.url+'accept?dboy_id='+id+'&order_id='+oid+"&lat="+localStorage.getItem('current_lat')+"&lng="+localStorage.getItem('current_lng')+"&lid="+localStorage.getItem('lid')+"&status=3")
             .pipe(map(results => results));
  }

  earn(id)
  {
    return this.http.get(this.url+'earn?id='+id)
             .pipe(map(results => results));
  }
}