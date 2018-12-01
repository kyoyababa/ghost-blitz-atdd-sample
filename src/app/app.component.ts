import { Component, OnInit } from '@angular/core'
import { Names, Colors, Item } from './app.d';

export class GhostBlitz {
  items: Array<Item> = [
    { name: 'オバケ', color: '白' },
    { name: 'ネズミ', color: '灰' },
    { name: 'いす', color: '赤' },
    { name: 'ボトル', color: '緑' },
    { name: '本', color: '青' },
  ];
  currentCard: Array<Item> | undefined;
  isCorrect = false;

  grab(currentCard: Array<Item>, itemName: string): void {
    if (!Array.isArray(currentCard)) return;

    if (currentCard.some(card => card.name === '本')) {
      this.isCorrect = false;
    }
    else if (this.getCorrectItem(currentCard).name === itemName) {
      this.isCorrect = true;
    }
  }

  shout(currentCard: Array<Item>, itemName: string): void {
    if (!Array.isArray(currentCard)) return;

    if (currentCard.every(card => card.name !== '本')) {
      this.isCorrect = false;
    }
    else if (this.getCorrectItem(currentCard).name === itemName) {
      this.isCorrect = true;
    }
  }

  getGrabbed(): Item | undefined {
    return;
  }

  generateNewCard(): void {
    const firstItem = {
      name: this.decideFirstItemName(),
      color: this.decideFirstItemColor()
    };
    const secondItemName = this.decideSecondItemName(firstItem);
    const secondItemColor = this.decideSecondItemColor(firstItem, secondItemName);
    const secondItem = {
      name: secondItemName,
      color: secondItemColor
    };

    this.currentCard = [ firstItem, secondItem ];
  }

  private getRandom(array: Array<any>): any {
    return array[Math.floor(Math.random() * array.length)];
  }

  private decideFirstItemName(): Names {
    return this.getRandom(this.items).name;
  }

  private decideFirstItemColor(): Colors {
    return this.getRandom(this.items).color;
  }

  private decideSecondItemName(firstItem: Item): Names {
    const targets = this.items.filter(item => {
      return item.name !== firstItem.name && item.color !== firstItem.color;
    });

    return this.getRandom(targets).name;
  }

  private decideSecondItemColor(firstItem: Item, secondItemName: Names): Colors {
    let isFirstItemPerfectlyMatched = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === firstItem.name && this.items[i].color === firstItem.color) {
        isFirstItemPerfectlyMatched = true;
        break;
      }
    }

    const targets = this.items.filter(item => {
      if (isFirstItemPerfectlyMatched) {
        return item.name !== firstItem.name && item.name !== secondItemName;
      }
      else {
        return item.color !== firstItem.color && item.name !== firstItem.name;
      }
    });

    return this.getRandom(targets).color;
  }

  getCorrectItem(currentCard: Array<Item>): Item {
    if (!Array.isArray(currentCard)) return;

    const perfectlyMatched = this.getPerfectlyMatched(currentCard);
    const perfectlyUnmatched = this.getPerfectlyUnmatched(currentCard);

    return perfectlyMatched || perfectlyUnmatched;
  }

  private getPerfectlyMatched(currentCard: Array<Item>): Item {
    const matched = this.items.filter(item => {
      return (item.name === currentCard[0].name && item.color === currentCard[0].color)
          || (item.name === currentCard[1].name && item.color === currentCard[1].color);
    });

    if (matched.length === 1) return matched[0];
  }

  private getPerfectlyUnmatched(currentCard: Array<Item>): Item {
    const matched = this.items.filter(item => {
      return item.name !== currentCard[0].name
          && item.name !== currentCard[1].name
          && item.color !== currentCard[0].color
          && item.color !== currentCard[1].color;
    });

    if (matched.length === 1) return matched[0];
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {}
}
