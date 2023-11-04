import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DescriptionService {
  private descriptions: { [key: number]: string } = {
    1: 'Pizza preparada com ingredientes de qualidade.',
    2: 'Experimente a frescura do sushi japonês.',
    3: 'Porção de macarrão servido com molho especial.',
    4: 'Hambúrguer suculento de outro mundo.',
    5: 'Fake natty! 🔨',
    6: 'Fique hidratado com nossa água pura.',
    7: 'Refrigerante gelado para saciar sua sede.',
    8: 'Cerveja gelada para complementar sua refeição.',
  };

  getDescription(id: number): string {
    return (
      this.descriptions[id] || 'Descrição padrão para produtos sem descrição.'
    );
  }

  getShortDescription(description: string): string {
    return description.length > 50
      ? `${description.substring(0, 50)}...`
      : description;
  }
}
