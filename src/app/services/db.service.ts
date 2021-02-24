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
  getShopByName(name) {
    return this.http.get(this.base_url + `/api/shops/${name}`)
                    .map(res => res.json())
  }

  /**
   * Permet de se connecter à une API qui affiche en temps réel les taux de changes 
   */
  getEurGnfExchangeRate() {
    return this.http.get(this.base_url + `/api/exchange-rate`)
                    .map(res => res.json())
  }

  /**
   * Récupère l'ensemble des points de retraits disponibles
   */
  getWithdrawals() {
    return this.http.get(this.base_url + `/api/withdrawals`)
                    .map(res => res.json())
  }

  /**
   * Permet de récupérer l'ensemble des pays du monde
   */
  getCountries() {
    return this.http.get('../data/countries.json')
                    .map(res => res.json())
  }

  /**
   * Récupère l'ensemble des e-mails présents dans la base de données
   */
  getEmails() {
    return this.http.get(this.base_url + '/api/emails')
                    .map(res => res.json())
  }

}
