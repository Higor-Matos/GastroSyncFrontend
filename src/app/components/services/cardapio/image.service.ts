import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private imageMap: { [key: number]: string } = {
    1: 'https://i.ibb.co/gW8BHP7/pizza.jpg',
    2: 'https://i.ibb.co/92yvPZF/Sushi.jpg',
    3: 'https://i.ibb.co/5n4J9YK/Macarr-o.jpg',
    4: 'https://i.ibb.co/qpk5ByM/Hamburger.jpg',
    5: 'https://i.ibb.co/gdqg4K5/Suco.jpg',
    6: 'https://i.imgur.com/8v5Xicel.jpg',
    7: 'https://i.ibb.co/kxwwz3Z/Refrigerante.jpg',
    8: 'https://i.ibb.co/WzJn0br/Cerveja.jpg',
  };

  getImageUrl(id: number): string {
    return this.imageMap[id] || 'erro.jpg';
  }
}
