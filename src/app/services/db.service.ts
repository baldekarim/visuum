import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'
import { Subject } from 'rxjs/Rx'
import * as jwtDecode from 'jwt-decode'

@Injectable()
export class DbService {

  searchResultSubject = new Subject()
  base_url = 'http://localhost:4201'
  userTransactionInfo = null
  recipientSelected = -1
  redirectToRecipient = false

  constructor(private http: Http) { }

  /**
   * Permet de lancer une requête http au serveur pour récupérer un ensemble de boutiques
   * Cette fonction renvoie soit l'ensemble des boutiques de la base de données si aucun filtre
   * n'est précisé dans l'URL ou un sous-ensemble correspondant à la sélection
   * @param urlArgs Partie de l'URL décrivant le filtre qu'on souhaite Ex : category=2&location=taouyah 
   */
  getShopsByUrl(urlArgs) {
    return this.http.get(this.base_url + '/api/shops/search?' + urlArgs)
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
   * Permet de récupérer l'ensemble des pays du monde
   */
  getCountries() {
    return this.http.get('../data/countries.json')
                    .map(res => res.json())
  }

  /**
   * Permet d'ajouter un nouvel utilisateur
   * @param user Utilisateur à créer
   */
  addUser(user) {
    return this.http.post(this.base_url + '/api/users/register', user)
                    .map(res => res.json());         
  }

  /**
   * Permet de valider l'inscription d'un utilisateur
   * @param keyUser Clé envoyée par mail à l'utilisateur lors de la création de son compte
   */
  validateUser(keyUser) {
    return this.http.get(this.base_url + '/api/users/register/validate?' + keyUser)
                    .map(res => res.json())
  }

  /**
   * Permet de vérifier si un utilisateur est connecté
   */
  isUserLoggedIn() {
    return !!localStorage.getItem('vsm-token')
  }

  /**
   * Permet de se connecter au système
   * @param user
   */
  connection(user) {
    return this.http.post(this.base_url + '/api/users/login/', user)
                    .map(res => res.json())
  }

  /**
   * Permet de décoder un token jwt
   * @param token 
   * @returns 
   */
  decodeToken(token) {
    return jwtDecode(token)
  }

  /**
   * Permet de se déconnecter
   */
  logOut() {
    localStorage.removeItem('vsm-token')
    this.redirectToRecipient = false
  }

  /**
   * Permet de créer un header contenant un token
   * @param token 
   * @returns 
   */
  addAuthorizationHeader(token) {
    const authorizationHeader = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return new RequestOptions({ headers: authorizationHeader });
  }

  /**
   * Permet de récupérer les informations de l'utilisateur connecté
   * @param token 
   * @returns 
   */
  getUserInfo(token) {
    const requestOptions = this.addAuthorizationHeader(token)
    return this.http.get(this.base_url + '/api/users/me/', requestOptions)
                    .map(res => res.json())
  }

  /**
   * Permet de modifier l'adresse d'un utilisateur
   * @param userData 
   * @param token 
   * @returns 
   */
  updateAddress(userData, token) {
    const requestOptions = this.addAuthorizationHeader(token)
    return this.http.put(this.base_url + '/api/users/me/address/', userData, requestOptions)
                    .map(res => res.json())
  }

    /**
   * Permet de modifier le mot de passe d'un utilisateur
   * @param userData 
   * @param token 
   * @returns 
   */
  updatePassword(userData, token) {
    const requestOptions = this.addAuthorizationHeader(token)
    return this.http.put(this.base_url + '/api/users/me/password/', userData, requestOptions)
                    .map(res => res.json())
  }

  /**
   * Permet de mettre à jour un mot de passe oublié
   * @param data 
   */
  updateForgottenPassword(data) {
    return this.http.post(this.base_url + '/api/users/me/password/new/', data)
                    .map(res => res.json())
  }


  /**
   * Permet de récupérer le taux de changes 
   */
  getEurGnfExchangeRate() {
    return this.http.get(this.base_url + `/api/vouchers/exchange-rate`)
                    .map(res => res.json())
  }

  /**
   * Récupère l'ensemble des points de retraits disponibles
   */
  getWithdrawals() {
    return this.http.get(this.base_url + `/api/vouchers/withdrawals`)
                    .map(res => res.json())
  }

  /**
   * Permet de stocker les informations d'une transaction en attendant la validation de la commande
   * @param transaction 
   */
  initiateUserTransaction(transaction) {
    this.userTransactionInfo = transaction
  }

  /**
   * Permet de rediriger la page vers les bénéficiaires
   */
  updateRedirectToRecipient() {
    this.redirectToRecipient = true
  }

  /**
   * Renvoi l'ensemble des bénéficiaires de l'utilisateur connecté
   * @param token 
   * @returns 
   */
  getRecipients(token) {
    const requestOptions = this.addAuthorizationHeader(token)
    return this.http.get(this.base_url + '/api/users/me/recipients/', requestOptions)
                    .map(res => res.json())
  }

  /**
   * Permet d'ajouter un nouveau bénéfiaire
   * @param token 
   */
  addRecipient(recipient, token) {
    const requestOptions = this.addAuthorizationHeader(token)
    return this.http.post(this.base_url + '/api/users/me/recipients/', recipient, requestOptions)
                    .map(res => res.json())
  }

  /**
   * Permet de spécifier l'identifiant en BD du bénéficiaire à transmettre au serveur
   * @param value 
   */
  updateRecipientSelected(value) {
    if (value > 0) this.recipientSelected = value
  }

  addTransaction(token) {
    const requestOptions = this.addAuthorizationHeader(token)
    this.userTransactionInfo.recipient_selected = this.recipientSelected
    return this.http.post(this.base_url + '/api/vouchers/transaction/', this.userTransactionInfo, requestOptions)
                    .map(res => res.json())
  } 

  /**
   * Permet de récupérer les détails d'une transaction en fonction de sa référence
   * @param reference
   */
  getTransactionByReference(reference, token) {
    const requestOptions = this.addAuthorizationHeader(token)
    return this.http.get(this.base_url + `/api/vouchers/transaction/receipt/${reference}`, requestOptions)
                    .map(res => res.json())
  }

}