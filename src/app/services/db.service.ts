import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'

import { Subject } from 'rxjs/Rx'

@Injectable()
export class DbService {

  searchResultSubject = new Subject()
  base_url = 'http://localhost:4201'

  constructor(private http: Http) { }

  /**
   * Permet de lancer une requête http au serveur pour récupérer un ensemble de boutiques
   * Cette fonction renvoie soit l'ensemble des boutiques de la base de données si aucun filtre
   * n'est précisé dans l'URL ou un sous-ensemble correspondant à la sélection
   * @param urlArgs Partie de l'URL décrivant le filtrant qu'on souhaite Ex : category=2&location=taouyah 
   */
  getShopsByUrl(urlArgs) {
    return this.http.get(this.base_url + '/api/search?' + urlArgs)
                    .map(res => res.json())
                    .do(res =>  this.searchResultSubject.next(res))
  }

  /**
   * Permet de récupérer une boutique en fonction de son identifiant
   * @param id Identifiant de la boutique
   */
  getShopById(id) {
    return this.http.get(this.base_url + `/api/shops/${id}`)
                    .map(res => res.json())
  }

}
