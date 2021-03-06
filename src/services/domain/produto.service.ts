import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findByCategoria(categoriaId: string, page: number = 0, linesPerPge: number = 24) : Observable<ProdutoDTO[]> {
    return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos?categorias=${categoriaId}&page=${page}&linesPerPage=${linesPerPge}`);
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    return this.http.get(url, {responseType: 'blob'});
  }

  findById(id: string): Observable<ProdutoDTO> {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${id}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
    return this.http.get(url, {responseType: 'blob'});
  }
}
