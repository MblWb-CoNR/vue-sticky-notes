Vue.component('note', {
    props: ['card', 'columnIndex'],
    template: ` 
      <div class="note-card" :class="{ locked: card.locked }">
             <h3>{{ card.title }}</h3>
             <ul>
                 <li v-for="(item, index) in card.items" :key="index">
                     <input
                      type="checkbox"
                      :checked="item.completed"
                      @change="switchItem(index)"/>
                     {{ item.text }}
                </li>
            </ul>
         </div>
    `,
    methods: {
        switchItem(index) {
            this.$emit('update-item', { cardIndex: this.card.index, itemIndex: index, columnIndex: this.columnIndex });
        }
    }
});

new Vue({
    el: '#app',
    data() {
        return {
            columns: [
                { title: 'Три', cards: [] },
                { title: 'Пять', cards: [] },
                { title: 'Бесконечно', cards: [] }
            ],
            maxCardsInColumnOne: 3,
            maxCardsInColumnTwo: 5,
        };
    },
    methods: {
        addCard(columnIndex) {
            if (columnIndex === 0 && this.columns[0].cards.length >= this.maxCardsInColumnOne) {
                alert('Первая колонка уже заполнена.');
                return;
            }
            if (columnIndex === 1 && this.columns[1].cards.length >= this.maxCardsInColumnTwo) {
                alert('Вторая колонка уже заполнена.');
                return;
            }
            const newCard = {
                title: prompt('Введите заголовок карточки:'),
                items: Array.from({ length: 4 }, () => ({
                    text: prompt('Введите пункт списка:'),
                    completed: false
                })),
                index: this.columns[columnIndex].cards.length,
                completedDate: null,
                locked: false
            };
            this.columns[columnIndex].cards.push(newCard);
        },
        updateItem(payload) {
            const { cardIndex, itemIndex, columnIndex } = payload;
            const card = this.columns[columnIndex].cards[cardIndex];

            card.items[itemIndex].completed = !card.items[itemIndex].completed;

            const completedCount = card.items.filter(item => item.completed).length;
            const totalItems = card.items.length;
        },
    },
    template: `
        <div id="app">
            <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="column">
                <h2>{{ column.title }}</h2>
                <note-card 
                    v-for="(card, cardIndex) in column.cards" 
                    :key="cardIndex" 
                    :card="card" 
                    :column-index="columnIndex"
                ></note-card>
            </div>
        </div>
    `
});