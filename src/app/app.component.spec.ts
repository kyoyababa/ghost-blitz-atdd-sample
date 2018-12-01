import { Given, When, Then } from '../assets/spec/util/given-when-then';
import { GhostBlitz } from './app.component';

describe('おばけキャッチ', () => {
  Given('ゲーム開始時', () => {
    const ghostBlitz = new GhostBlitz();

    Then('５つのアイテムが提示されていること', () => {
      expect(ghostBlitz.items.length).toBe(5);
    });
    Then('すべてのアイテムが摑まれていないこと', () => {
      expect(ghostBlitz.getGrabbed()).toBeUndefined();
    });
    Then('カードがめくられていないこと', () => {
      expect(ghostBlitz.currentCard).toBeUndefined();
    });
  });

  Given('カードがめくられていない状態で', () => {
    When('オバケを摑んだとき', () => {
      const ghostBlitz = new GhostBlitz();

      Then('不正解になること', () => {
        ghostBlitz.grab(ghostBlitz.currentCard, 'オバケ');
        expect(ghostBlitz.isCorrect).toBeFalsy();
      });
    });

    When('新しいカードがめくられたとき', () => {
      const ghostBlitz = new GhostBlitz();
      ghostBlitz.generateNewCard();

      Then('カードに２つのアイテムが記載されていること', () => {
        expect(ghostBlitz.currentCard.length).toBe(2);
      });
      Then('カードに記載されているアイテムが互いに異なること', () => {
        const itemNames = ghostBlitz.currentCard.map(item => item.name);
        const uniqueItemNames = itemNames.filter((x, i, self) => self.indexOf(x) === i);
        expect(uniqueItemNames.length).toBe(2);
      });
      Then('カードに記載されているアイテムの色が互いに異なること', () => {
        const itemColors = ghostBlitz.currentCard.map(item => item.color);
        const uniqueItemColors = itemColors.filter((x, i, self) => self.indexOf(x) === i);
        expect(uniqueItemColors.length).toBe(2);
      });
      Then('カードに記載されているアイテムが両方正解ではないこと', () => {
        expect(ghostBlitz.getCorrectItem(ghostBlitz.currentCard)).toBeTruthy();
      });
    });

    When('カードが100枚めくられたとき', () => {
      for (let i = 0; i < 100; i++) {
        const ghostBlitz = new GhostBlitz();
        ghostBlitz.generateNewCard();

        Then(`${i}枚目のカードに記載されているアイテムが両方正解ではないこと`, () => {
          expect(ghostBlitz.getCorrectItem(ghostBlitz.currentCard)).toBeTruthy();
        });
      }
    });

    When('新しいカードがめくられ、', () => {
      const ghostBlitz = new GhostBlitz();
      ghostBlitz.generateNewCard();

      When('白いオバケと赤のネズミが記載されているとき', () => {
        ghostBlitz.currentCard = [
          { name: 'オバケ', color: '白' },
          { name: 'ネズミ', color: '赤' },
        ];

        Then('白いオバケが正解であること', () => {
          expect(ghostBlitz.getCorrectItem(ghostBlitz.currentCard)).toEqual(
            { name: 'オバケ', color: '白' },
          );
        });

        When('オバケを摑んだとき', () => {
          Then('正解になること', () => {
            ghostBlitz.grab(ghostBlitz.currentCard, 'オバケ');
            expect(ghostBlitz.isCorrect).toBeTruthy();
          });
        });
      });
    });

    When('新しいカードがめくられ、', () => {
      const ghostBlitz = new GhostBlitz();
      ghostBlitz.generateNewCard();

      When('赤いいすと灰色のボトルが記載されているとき', () => {
        ghostBlitz.currentCard = [
          { name: 'いす', color: '赤' },
          { name: 'ボトル', color: '灰' },
        ];

        Then('赤いいすが正解であること', () => {
          expect(ghostBlitz.getCorrectItem(ghostBlitz.currentCard)).toEqual(
            { name: 'いす', color: '赤' },
          );
        });

        When('ネズミを摑んだとき', () => {
          Then('不正解になること', () => {
            ghostBlitz.grab(ghostBlitz.currentCard, 'ネズミ');
            expect(ghostBlitz.isCorrect).toBeFalsy();
          });
        });
      });
    });

    When('新しいカードがめくられ、', () => {
      const ghostBlitz = new GhostBlitz();
      ghostBlitz.generateNewCard();

      When('赤いオバケと灰色のボトルが記載されているとき', () => {
        ghostBlitz.currentCard = [
          { name: 'オバケ', color: '赤' },
          { name: 'ボトル', color: '灰' },
        ];

        Then('青い本が正解であること', () => {
          expect(ghostBlitz.getCorrectItem(ghostBlitz.currentCard)).toEqual(
            { name: '本', color: '青' },
          );
        });

        When('本を摑んだとき', () => {
          Then('正解になること', () => {
            ghostBlitz.grab(ghostBlitz.currentCard, '本');
            expect(ghostBlitz.isCorrect).toBeTruthy();
          });
        });
      });
    });

    When('新しいカードがめくられ、', () => {
      const ghostBlitz = new GhostBlitz();
      ghostBlitz.generateNewCard();

      When('赤いオバケと緑の本が記載されているとき', () => {
        ghostBlitz.currentCard = [
          { name: 'オバケ', color: '赤' },
          { name: '本', color: '緑' },
        ];

        Then('灰色のネズミが正解であること', () => {
          expect(ghostBlitz.getCorrectItem(ghostBlitz.currentCard)).toEqual(
            { name: 'ネズミ', color: '灰' },
          );
        });

        When('ネズミを摑んだとき', () => {
          Then('不正解になること', () => {
            ghostBlitz.grab(ghostBlitz.currentCard, 'ネズミ');
            expect(ghostBlitz.isCorrect).toBeFalsy();
          });
        });

        When('ネズミと叫んだとき', () => {
          Then('正解になること', () => {
            ghostBlitz.shout(ghostBlitz.currentCard, 'ネズミ');
            expect(ghostBlitz.isCorrect).toBeTruthy();
          });
        });
      });
    });
  });
});
